const express = require('express');
const router = express.Router();
const { pool } = require('../db/db');
const auth = require('../middleware/auth');

router.use(auth);

// ── Progreso por certificación ────────────────────────────────────────────────

router.get('/progress/:certKey', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT data FROM user_progress WHERE user_id = $1 AND cert_key = $2',
      [req.user.id, req.params.certKey]
    );
    res.json(result.rows[0]?.data || null);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error' });
  }
});

router.post('/progress/:certKey', async (req, res) => {
  try {
    await pool.query(
      `INSERT INTO user_progress (user_id, cert_key, data, updated_at)
       VALUES ($1, $2, $3, NOW())
       ON CONFLICT (user_id, cert_key)
       DO UPDATE SET data = $3, updated_at = NOW()`,
      [req.user.id, req.params.certKey, JSON.stringify(req.body)]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error' });
  }
});

router.delete('/progress/:certKey', async (req, res) => {
  try {
    await pool.query(
      'DELETE FROM user_progress WHERE user_id = $1 AND cert_key = $2',
      [req.user.id, req.params.certKey]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error' });
  }
});

// ── Datos extendidos (notas, SRS, historial, logros) ─────────────────────────

router.get('/enhanced', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM user_enhanced WHERE user_id = $1',
      [req.user.id]
    );
    const row = result.rows[0];
    if (!row)
      return res.json({ notes: {}, srs: {}, history: [], achievements: {}, maxStreak: 0 });
    res.json({
      notes: row.notes,
      srs: row.srs,
      history: row.history,
      achievements: row.achievements,
      maxStreak: row.max_streak,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error' });
  }
});

router.post('/notes', async (req, res) => {
  const { notes } = req.body;
  try {
    await pool.query(
      `INSERT INTO user_enhanced (user_id, notes, updated_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (user_id) DO UPDATE SET notes = $2, updated_at = NOW()`,
      [req.user.id, JSON.stringify(notes)]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error' });
  }
});

router.post('/srs', async (req, res) => {
  const { srsData } = req.body;
  try {
    await pool.query(
      `INSERT INTO user_enhanced (user_id, srs, updated_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (user_id) DO UPDATE SET srs = $2, updated_at = NOW()`,
      [req.user.id, JSON.stringify(srsData)]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error' });
  }
});

router.post('/history', async (req, res) => {
  const { history } = req.body;
  try {
    await pool.query(
      `INSERT INTO user_enhanced (user_id, history, updated_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (user_id) DO UPDATE SET history = $2, updated_at = NOW()`,
      [req.user.id, JSON.stringify(history)]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error' });
  }
});

router.post('/achievements', async (req, res) => {
  const { achievements, maxStreak } = req.body;
  try {
    await pool.query(
      `INSERT INTO user_enhanced (user_id, achievements, max_streak, updated_at)
       VALUES ($1, $2, $3, NOW())
       ON CONFLICT (user_id) DO UPDATE SET achievements = $2, max_streak = $3, updated_at = NOW()`,
      [req.user.id, JSON.stringify(achievements), maxStreak || 0]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error' });
  }
});

// ── Configuración (tema + IA) ─────────────────────────────────────────────────

router.get('/theme', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT theme FROM user_settings WHERE user_id = $1',
      [req.user.id]
    );
    res.json({ theme: result.rows[0]?.theme || 'light' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error' });
  }
});

router.post('/theme', async (req, res) => {
  const { theme } = req.body;
  try {
    await pool.query(
      `INSERT INTO user_settings (user_id, theme, updated_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (user_id) DO UPDATE SET theme = $2, updated_at = NOW()`,
      [req.user.id, theme]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error' });
  }
});

router.get('/aiconfig', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT ai_config FROM user_settings WHERE user_id = $1',
      [req.user.id]
    );
    res.json(result.rows[0]?.ai_config || {});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error' });
  }
});

router.post('/aiconfig', async (req, res) => {
  const { config } = req.body;
  try {
    await pool.query(
      `INSERT INTO user_settings (user_id, ai_config, updated_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (user_id) DO UPDATE SET ai_config = $2, updated_at = NOW()`,
      [req.user.id, JSON.stringify(config)]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error' });
  }
});

// ── Material de estudio ───────────────────────────────────────────────────────

router.get('/study/:certKey', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, type, title, content, created_at FROM study_material WHERE user_id = $1 AND cert_key = $2 ORDER BY created_at ASC',
      [req.user.id, req.params.certKey]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error' });
  }
});

router.post('/study/:certKey', async (req, res) => {
  const { type, title, content } = req.body;
  if (!content && !title) return res.status(400).json({ error: 'Se requiere título o contenido' });
  const validTypes = ['note', 'url', 'text'];
  const safeType = validTypes.includes(type) ? type : 'note';
  try {
    const result = await pool.query(
      'INSERT INTO study_material (user_id, cert_key, type, title, content) VALUES ($1, $2, $3, $4, $5) RETURNING id, type, title, content, created_at',
      [req.user.id, req.params.certKey, safeType, title || '', content || '']
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error' });
  }
});

router.delete('/study/:certKey/:id', async (req, res) => {
  try {
    await pool.query(
      'DELETE FROM study_material WHERE id = $1 AND user_id = $2 AND cert_key = $3',
      [req.params.id, req.user.id, req.params.certKey]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error' });
  }
});

// ── Proxy para Compatible OpenAI (evita CORS en frontend) ────────────────────

router.post('/ai-proxy', async (req, res) => {
  const { url, model, messages, apiKey, maxTokens, temperature } = req.body;
  if (!url || !model || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'url, model y messages son requeridos' });
  }
  // Bloquear rangos RFC1918 (SSRF) — localhost se descarta a nivel red en producción
  try {
    const parsed = new URL(url);
    const host = parsed.hostname;
    if (/^(10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.)/.test(host)) {
      return res.status(400).json({ error: 'URL no permitida' });
    }
  } catch {
    return res.status(400).json({ error: 'URL inválida' });
  }

  const headers = { 'Content-Type': 'application/json' };
  if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;

  try {
    const upstream = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ model, messages, temperature: temperature ?? 0.1, max_tokens: maxTokens ?? 4000 }),
      signal: AbortSignal.timeout(120000),
    });
    const data = await upstream.json();
    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: data?.error?.message || `HTTP ${upstream.status}` });
    }
    res.json(data);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

module.exports = router;
