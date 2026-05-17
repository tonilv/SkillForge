const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../db/db');
const authMiddleware = require('../middleware/auth');

function makeToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
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
      'INSERT INTO users (email, password_hash, display_name) VALUES ($1, $2, $3) RETURNING id, email, display_name',
      [email.toLowerCase().trim(), hash, displayName || email.split('@')[0]]
    );
    const user = result.rows[0];
    res.json({
      token: makeToken(user),
      user: { id: user.id, email: user.email, displayName: user.display_name },
    });
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
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid)
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });

    res.json({
      token: makeToken(user),
      user: { id: user.id, email: user.email, displayName: user.display_name },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, display_name FROM users WHERE id = $1',
      [req.user.id]
    );
    if (!result.rows[0])
      return res.status(404).json({ error: 'Usuario no encontrado' });
    const u = result.rows[0];
    res.json({ user: { id: u.id, email: u.email, displayName: u.display_name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error' });
  }
});

module.exports = router;
