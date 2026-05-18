require('dotenv').config();
const express = require('express');
const path = require('path');
const { initSchema, pool } = require('./db/db');
const { migrate } = require('./db/migrate');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname)));

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
