const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { pool } = require('../db/db');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

function createTransporter() {
  return nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: { ciphers: 'SSLv3' },
  });
}

router.use(authMiddleware, adminMiddleware);

router.get('/users', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, display_name, is_admin, totp_enabled, is_active, must_change_password, created_at FROM users ORDER BY created_at ASC'
    );
    res.json({ users: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error obteniendo usuarios' });
  }
});

router.post('/users', async (req, res) => {
  const { email, password, displayName, isAdmin } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email y contraseña requeridos' });
  if (password.length < 8)
    return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres' });

  try {
    const hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password_hash, display_name, is_admin, must_change_password) VALUES ($1, $2, $3, $4, TRUE) RETURNING id, email, display_name, is_admin, totp_enabled, is_active, must_change_password, created_at',
      [email.toLowerCase().trim(), hash, displayName || email.split('@')[0], !!isAdmin]
    );
    res.json({ user: result.rows[0] });
  } catch (err) {
    if (err.code === '23505')
      return res.status(409).json({ error: 'Ya existe una cuenta con ese email' });
    console.error(err);
    res.status(500).json({ error: 'Error creando usuario' });
  }
});

router.patch('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { isActive, isAdmin } = req.body;

  // Prevent admin from deactivating themselves
  if (String(id) === String(req.user.id) && isActive === false)
    return res.status(400).json({ error: 'No puedes desactivar tu propia cuenta' });

  try {
    const updates = [];
    const values = [];
    let idx = 1;

    if (isActive !== undefined) { updates.push(`is_active = $${idx++}`); values.push(isActive); }
    if (isAdmin !== undefined) { updates.push(`is_admin = $${idx++}`); values.push(isAdmin); }

    if (!updates.length) return res.status(400).json({ error: 'Nada que actualizar' });

    values.push(id);
    const result = await pool.query(
      `UPDATE users SET ${updates.join(', ')} WHERE id = $${idx} RETURNING id, email, display_name, is_admin, totp_enabled, is_active, created_at`,
      values
    );
    if (!result.rows[0]) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error actualizando usuario' });
  }
});

router.post('/users/:id/reset-2fa', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'UPDATE users SET totp_secret = NULL, totp_enabled = FALSE WHERE id = $1 RETURNING id',
      [id]
    );
    if (!result.rows[0]) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error reseteando 2FA' });
  }
});

router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  if (String(id) === String(req.user.id))
    return res.status(400).json({ error: 'No puedes eliminar tu propia cuenta' });

  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
    if (!result.rows[0]) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error eliminando usuario' });
  }
});

// Send announcement email to all active users
router.post('/announcement/send', async (req, res) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return res.status(503).json({ error: 'Email no configurado. Añade SMTP_USER y SMTP_PASS en Railway.' });
  }

  // Get announcement text
  const settingResult = await pool.query(`SELECT value FROM app_settings WHERE key = 'announcement'`);
  if (!settingResult.rows[0]) return res.status(400).json({ error: 'No hay ningún anuncio guardado.' });
  const ann = settingResult.rows[0].value;
  if (!ann || !ann.text) return res.status(400).json({ error: 'El anuncio está vacío.' });

  // Get all active users with email
  const usersResult = await pool.query(`SELECT email, display_name FROM users WHERE is_active = TRUE ORDER BY id ASC`);
  const users = usersResult.rows;
  if (!users.length) return res.status(400).json({ error: 'No hay usuarios activos.' });

  const transporter = createTransporter();
  const senderName = 'SkillForge';
  const from = `"${senderName}" <${process.env.SMTP_USER}>`;

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
      <h2 style="color:#1d4ed8;margin-bottom:8px;">SkillForge</h2>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin-bottom:24px;">
      <p style="font-size:16px;line-height:1.6;color:#111827;">${ann.text.replace(/\n/g, '<br>')}</p>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin-top:24px;">
      <p style="font-size:12px;color:#9ca3af;">Has recibido este mensaje porque tienes una cuenta en SkillForge.</p>
    </div>
  `;

  // Verify SMTP connection first
  try {
    await transporter.verify();
  } catch (err) {
    console.error('SMTP verify failed:', err);
    return res.status(503).json({ error: `Error de conexión SMTP: ${err.message}` });
  }

  let sent = 0;
  let failed = 0;
  let firstError = null;
  for (const user of users) {
    try {
      await transporter.sendMail({
        from,
        to: user.email,
        subject: `[SkillForge] Aviso importante`,
        text: ann.text,
        html,
      });
      sent++;
    } catch (err) {
      console.error(`Email fallido para ${user.email}:`, err.message);
      if (!firstError) firstError = err.message;
      failed++;
    }
  }

  res.json({ ok: true, sent, failed, total: users.length, firstError });
});

// Announcement management
router.put('/announcement', async (req, res) => {
  const { text, enabled } = req.body;
  if (typeof text !== 'string') return res.status(400).json({ error: 'text requerido' });
  const trimmed = text.trim().slice(0, 1000);
  try {
    await pool.query(
      `INSERT INTO app_settings (key, value, updated_at)
       VALUES ('announcement', $1, NOW())
       ON CONFLICT (key) DO UPDATE SET value = $1, updated_at = NOW()`,
      [JSON.stringify({ text: trimmed, enabled: enabled !== false })]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error guardando anuncio' });
  }
});

module.exports = router;
