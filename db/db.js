const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

async function initSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      display_name VARCHAR(100),
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
  `);
}

module.exports = { pool, initSchema };
