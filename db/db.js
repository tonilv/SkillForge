const { Pool } = require('pg');

if (!process.env.DATABASE_URL) {
  console.error('ERROR: DATABASE_URL no está definida.');
  console.error('En Railway: Variables → añade DATABASE_URL = ${{Postgres.DATABASE_URL}}');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function initSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      display_name VARCHAR(100),
      is_admin BOOLEAN DEFAULT FALSE,
      totp_secret VARCHAR(100),
      totp_enabled BOOLEAN DEFAULT FALSE,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS user_progress (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      cert_key VARCHAR(50) NOT NULL,
      data JSONB DEFAULT '{}',
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(user_id, cert_key)
    );

    CREATE TABLE IF NOT EXISTS user_enhanced (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE UNIQUE,
      notes JSONB DEFAULT '{}',
      srs JSONB DEFAULT '{}',
      history JSONB DEFAULT '[]',
      achievements JSONB DEFAULT '{}',
      max_streak INTEGER DEFAULT 0,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS user_settings (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE UNIQUE,
      theme VARCHAR(10) DEFAULT 'light',
      ai_config JSONB DEFAULT '{}',
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS providers (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      icon VARCHAR(10),
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS certifications (
      id VARCHAR(50) NOT NULL,
      provider_id VARCHAR(50) REFERENCES providers(id) ON DELETE CASCADE,
      name VARCHAR(200),
      short_name VARCHAR(50),
      display_name VARCHAR(200),
      description TEXT,
      has_practice BOOLEAN DEFAULT FALSE,
      has_scenarios BOOLEAN DEFAULT FALSE,
      has_console BOOLEAN DEFAULT FALSE,
      has_live_practice BOOLEAN DEFAULT FALSE,
      questions JSONB DEFAULT '[]',
      concepts JSONB DEFAULT '[]',
      scenarios JSONB DEFAULT '[]',
      practice_commands JSONB DEFAULT '[]',
      console_missions JSONB DEFAULT '[]',
      live_practice_tasks JSONB DEFAULT '[]',
      sort_order INTEGER DEFAULT 0,
      PRIMARY KEY (provider_id, id)
    );
  `);

  // Add new columns to existing databases (pg requires one statement per query)
  await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE`);
  await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS totp_secret VARCHAR(100)`);
  await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS totp_enabled BOOLEAN DEFAULT FALSE`);
  await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE`);
  await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS must_change_password BOOLEAN DEFAULT FALSE`);
}

module.exports = { pool, initSchema };
