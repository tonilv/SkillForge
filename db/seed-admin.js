require('dotenv').config();
const bcrypt = require('bcrypt');
const { pool, initSchema } = require('./db');

async function seedAdmin() {
  await initSchema();

  const email = 'admin@skillforge.local';
  const password = 'Admin#2025!';
  const hash = await bcrypt.hash(password, 10);

  await pool.query(
    `INSERT INTO users (email, password_hash, display_name, is_admin, is_active)
     VALUES ($1, $2, 'Administrador', TRUE, TRUE)
     ON CONFLICT (email) DO UPDATE SET is_admin = TRUE, is_active = TRUE`,
    [email, hash]
  );

  console.log('Admin user ready:');
  console.log('  Email:    admin@skillforge.local');
  console.log('  Password: Admin#2025!');
  console.log('  Note: 2FA setup required on first login.');
  process.exit(0);
}

seedAdmin().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
