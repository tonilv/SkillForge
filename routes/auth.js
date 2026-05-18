const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticator } = require('otplib');
const qrcode = require('qrcode');
const { pool } = require('../db/db');
const authMiddleware = require('../middleware/auth');
const preAuthMiddleware = require('../middleware/preAuth');

function makePreAuthToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, is_admin: user.is_admin, pre_auth: true },
    process.env.JWT_SECRET,
    { expiresIn: '10m' }
  );
}

function makeFullToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, is_admin: user.is_admin, mfa: true },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
}

function makeTrustedDeviceToken(userId) {
  return jwt.sign(
    { id: userId, purpose: 'trusted_device' },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

function buildUser(row, id) {
  return {
    id: id || row.id,
    email: row.email,
    displayName: row.display_name,
    is_admin: row.is_admin,
    must_change_password: row.must_change_password || false,
  };
}

// Public registration disabled — admin creates users via /api/admin/users
router.post('/register', (req, res) => {
  res.status(403).json({ error: 'El registro público está desactivado. Contacta con el administrador.' });
});

router.post('/login', async (req, res) => {
  const { email, password, trustedDevice } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email y contraseña requeridos' });

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [
      email.toLowerCase().trim(),
    ]);
    const user = result.rows[0];
    if (!user)
      return res.status(400).json({ error: 'Email o contraseña incorrectos' });

    if (!user.is_active)
      return res.status(403).json({ error: 'Cuenta desactivada. Contacta con el administrador.' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid)
      return res.status(400).json({ error: 'Email o contraseña incorrectos' });

    if (!user.totp_enabled) {
      return res.json({ needsSetup: true, preToken: makePreAuthToken(user) });
    }

    // Si hay un token de dispositivo de confianza válido, saltar 2FA
    if (trustedDevice) {
      try {
        const decoded = jwt.verify(trustedDevice, process.env.JWT_SECRET);
        if (decoded.purpose === 'trusted_device' && decoded.id === user.id) {
          const fullUser = buildUser(user);
          return res.json({ token: makeFullToken(fullUser), user: fullUser });
        }
      } catch {
        // Token inválido o expirado — continuar con 2FA normal
      }
    }

    res.json({ requires2fa: true, preToken: makePreAuthToken(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

// GET /api/auth/2fa/setup — generate TOTP secret + QR code
router.get('/2fa/setup', preAuthMiddleware, async (req, res) => {
  try {
    const result = await pool.query('SELECT email FROM users WHERE id = $1', [req.user.id]);
    const user = result.rows[0];
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const secret = authenticator.generateSecret();
    const otpauthUrl = authenticator.keyuri(user.email, 'SkillForge', secret);

    await pool.query('UPDATE users SET totp_secret = $1 WHERE id = $2', [secret, req.user.id]);

    const qrDataUrl = await qrcode.toDataURL(otpauthUrl);
    res.json({ qrDataUrl, manualCode: secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error generando 2FA' });
  }
});

// POST /api/auth/2fa/enable — confirm TOTP setup with first code
router.post('/2fa/enable', preAuthMiddleware, async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'Código requerido' });

  try {
    const result = await pool.query(
      'SELECT totp_secret, is_admin, email, display_name, must_change_password FROM users WHERE id = $1',
      [req.user.id]
    );
    const user = result.rows[0];
    if (!user || !user.totp_secret)
      return res.status(400).json({ error: 'Primero genera el código QR' });

    const valid = authenticator.verify({ token: code, secret: user.totp_secret });
    if (!valid) return res.status(400).json({ error: 'Código incorrecto' });

    await pool.query('UPDATE users SET totp_enabled = TRUE WHERE id = $1', [req.user.id]);

    const fullUser = buildUser(user, req.user.id);
    res.json({ token: makeFullToken(fullUser), user: fullUser, trustedDeviceToken: makeTrustedDeviceToken(req.user.id) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error activando 2FA' });
  }
});

// POST /api/auth/2fa/verify — verify TOTP code at login
router.post('/2fa/verify', preAuthMiddleware, async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'Código requerido' });

  try {
    const result = await pool.query(
      'SELECT totp_secret, totp_enabled, is_admin, email, display_name, must_change_password FROM users WHERE id = $1',
      [req.user.id]
    );
    const user = result.rows[0];
    if (!user || !user.totp_enabled)
      return res.status(400).json({ error: '2FA no configurado' });

    const valid = authenticator.verify({ token: code, secret: user.totp_secret });
    if (!valid) return res.status(401).json({ error: 'Código incorrecto' });

    const fullUser = buildUser(user, req.user.id);
    res.json({ token: makeFullToken(fullUser), user: fullUser, trustedDeviceToken: makeTrustedDeviceToken(req.user.id) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error verificando 2FA' });
  }
});

// POST /api/auth/change-password — forced password change on first login
router.post('/change-password', authMiddleware, async (req, res) => {
  const { newPassword } = req.body;
  if (!newPassword || newPassword.length < 6)
    return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });

  try {
    const hash = await bcrypt.hash(newPassword, 10);
    await pool.query(
      'UPDATE users SET password_hash = $1, must_change_password = FALSE WHERE id = $2',
      [hash, req.user.id]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al cambiar la contraseña' });
  }
});

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, display_name, is_admin, must_change_password FROM users WHERE id = $1',
      [req.user.id]
    );
    if (!result.rows[0])
      return res.status(404).json({ error: 'Usuario no encontrado' });
    const u = result.rows[0];
    res.json({ user: buildUser(u) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error' });
  }
});

module.exports = router;
