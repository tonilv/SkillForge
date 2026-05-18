require('dotenv').config();
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { initSchema, pool } = require('./db/db');
const { migrate } = require('./db/migrate');

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  console.error('ERROR: JWT_SECRET debe tener al menos 32 caracteres.');
  process.exit(1);
}

const app = express();

app.use(helmet({
  contentSecurityPolicy: false, // desactivado para compatibilidad con inline scripts
}));

app.use(express.json({ limit: '100kb' }));
app.use(express.static(path.join(__dirname)));

// Rate limiting en endpoints de autenticación
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiados intentos. Espera 15 minutos.' },
});
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/2fa', authLimiter);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/data', require('./routes/data'));
app.use('/api/content', require('./routes/content'));
app.use('/api/admin', require('./routes/admin'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;

async function start() {
  await initSchema();

  // Seed automático: si providers está vacío, cargar datos de certifications.js
  const { rows } = await pool.query('SELECT COUNT(*) FROM providers');
  if (parseInt(rows[0].count, 10) === 0) {
    console.log('Providers vacío — ejecutando seed inicial...');
    await migrate();
  }

  app.listen(PORT, () => console.log(`SkillForge running on :${PORT}`));
}

start().catch(err => {
  console.error('Error al iniciar el servidor:', err);
  process.exit(1);
});
