const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { pool } = require('../db/db');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

router.use(authMiddleware, adminMiddleware);

router.get('/users', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, display_name, is_admin, totp_enabled, is_active, created_at FROM users ORDER BY created_at ASC'
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
  if (password.length < 6)
    return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });

  try {
    const hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password_hash, display_name, is_admin) VALUES ($1, $2, $3, $4) RETURNING id, email, display_name, is_admin, totp_enabled, is_active, created_at',
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

module.exports = router;
