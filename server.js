require('dotenv').config();
const express = require('express');
const path = require('path');
const { initSchema } = require('./db/db');

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

initSchema()
  .then(() => {
    app.listen(PORT, () => console.log(`SkillForge running on :${PORT}`));
  })
  .catch(err => {
    console.error('Error inicializando base de datos:', err);
    process.exit(1);
  });
