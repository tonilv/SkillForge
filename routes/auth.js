const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
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

router.post('/register', async (req, res) => {
  const { email, password, displayName } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email y contraseña requeridos' });
  if (password.length < 6)
    return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });

  try {
    const hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password_hash, display_name) VALUES ($1, $2, $3) RETURNING id, email, display_name, is_admin',
      [email.toLowerCase().trim(), hash, displayName || email.split('@')[0]]
    );
    const user = result.rows[0];
    // New users must set up 2FA before getting a full token
    res.json({ needsSetup: true, preToken: makePreAuthToken(user) });
  } catch (err) {
    if (err.code === '23505')
      return res.status(409).json({ error: 'Ya existe una cuenta con ese email' });
    console.error(err);
    res.status(500).json({ error: 'Error al crear la cuenta' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
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
      // 2FA not set up yet — send pre-auth token so they can set it up
      return res.json({ needsSetup: true, preToken: makePreAuthToken(user) });
    }

    // 2FA set up — send pre-auth token for verification
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

    const secret = speakeasy.generateSecret({
      name: `SkillForge (${user.email})`,
      issuer: 'SkillForge',
    });

    // Save pending secret (not yet confirmed)
    await pool.query('UPDATE users SET totp_secret = $1 WHERE id = $2', [
      secret.base32,
      req.user.id,
    ]);

    const qrDataUrl = await qrcode.toDataURL(secret.otpauth_url);

    res.json({ qrDataUrl, manualCode: secret.base32 });
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
      'SELECT totp_secret, is_admin, email, display_name FROM users WHERE id = $1',
      [req.user.id]
    );
    const user = result.rows[0];
    if (!user || !user.totp_secret)
      return res.status(400).json({ error: 'Primero genera el código QR' });

    const valid = speakeasy.totp.verify({
      secret: user.totp_secret,
      encoding: 'base32',
      token: code,
      window: 1,
    });

    if (!valid) return res.status(400).json({ error: 'Código incorrecto' });

    await pool.query('UPDATE users SET totp_enabled = TRUE WHERE id = $1', [req.user.id]);

    const fullUser = { id: req.user.id, email: user.email, displayName: user.display_name, is_admin: user.is_admin };
    res.json({ token: makeFullToken(fullUser), user: fullUser });
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
      'SELECT totp_secret, totp_enabled, is_admin, email, display_name FROM users WHERE id = $1',
      [req.user.id]
    );
    const user = result.rows[0];
    if (!user || !user.totp_enabled)
      return res.status(400).json({ error: '2FA no configurado' });

    const valid = speakeasy.totp.verify({
      secret: user.totp_secret,
      encoding: 'base32',
      token: code,
      window: 1,
    });

    if (!valid) return res.status(401).json({ error: 'Código incorrecto' });

    const fullUser = { id: req.user.id, email: user.email, displayName: user.display_name, is_admin: user.is_admin };
    res.json({ token: makeFullToken(fullUser), user: fullUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error verificando 2FA' });
  }
});

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, display_name, is_admin FROM users WHERE id = $1',
      [req.user.id]
    );
    if (!result.rows[0])
      return res.status(404).json({ error: 'Usuario no encontrado' });
    const u = result.rows[0];
    res.json({ user: { id: u.id, email: u.email, displayName: u.display_name, is_admin: u.is_admin } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error' });
  }
});

module.exports = router;
