const express = require('express');
const router = express.Router();
const { pool } = require('../db/db');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const providersResult = await pool.query(
      'SELECT * FROM providers ORDER BY sort_order'
    );
    const certsResult = await pool.query(
      'SELECT * FROM certifications ORDER BY sort_order'
    );

    const result = {};

    for (const provider of providersResult.rows) {
      result[provider.id] = {
        id: provider.id,
        name: provider.name,
        icon: provider.icon,
        certifications: {},
      };
    }

    for (const cert of certsResult.rows) {
      const provider = result[cert.provider_id];
      if (!provider) continue;
      provider.certifications[cert.id] = {
        id: cert.id,
        name: cert.name,
        shortName: cert.short_name,
        displayName: cert.display_name,
        description: cert.description,
        hasPractice: cert.has_practice,
        hasScenarios: cert.has_scenarios,
        hasConsole: cert.has_console,
        hasLivePractice: cert.has_live_practice,
        questions: cert.questions || [],
        concepts: cert.concepts || [],
        scenarios: cert.scenarios || [],
        practiceCommands: cert.practice_commands || [],
        consoleMissions: cert.console_missions || [],
        livePracticeTasks: cert.live_practice_tasks || [],
      };
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error cargando contenido' });
  }
});

module.exports = router;
