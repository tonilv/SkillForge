// db/migrate.js
// Siembra los datos de data/certifications.js en PostgreSQL.
// Uso manual: node db/migrate.js
// También es importado por server.js para el seed automático en primer arranque.

require('dotenv').config();
const vm = require('vm');
const fs = require('fs');
const path = require('path');
const { pool } = require('./db');

async function loadCertificationsFromFile() {
  const filePath = path.join(__dirname, '../data/certifications.js');
  const code = fs.readFileSync(filePath, 'utf8');
  const ctx = { globalThis: {}, console };
  vm.createContext(ctx);
  vm.runInContext(code, ctx);
  return ctx.certifications || ctx.globalThis.certifications;
}

async function migrate() {
  console.log('Cargando datos de certifications.js...');
  const certifications = await loadCertificationsFromFile();

  if (!certifications) {
    console.error('No se pudo leer el objeto certifications del archivo JS.');
    process.exit(1);
  }

  const providers = Object.values(certifications);
  let providerOrder = 0;

  for (const provider of providers) {
    console.log(`\nInsertando proveedor: ${provider.name}`);

    await pool.query(
      `INSERT INTO providers (id, name, icon, sort_order)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (id) DO UPDATE
         SET name = $2, icon = $3, sort_order = $4`,
      [provider.id, provider.name, provider.icon || '', providerOrder++]
    );

    const certs = Object.values(provider.certifications || {});
    let certOrder = 0;

    for (const cert of certs) {
      console.log(`  Insertando certificación: ${cert.name} (${(cert.questions || []).length} preguntas)`);

      await pool.query(
        `INSERT INTO certifications
           (id, provider_id, name, short_name, display_name, description,
            has_practice, has_scenarios, has_console, has_live_practice,
            questions, concepts, scenarios, practice_commands, console_missions,
            live_practice_tasks, sort_order)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
         ON CONFLICT (provider_id, id) DO UPDATE
           SET name=$3, short_name=$4, display_name=$5, description=$6,
               has_practice=$7, has_scenarios=$8, has_console=$9, has_live_practice=$10,
               questions=$11, concepts=$12, scenarios=$13, practice_commands=$14,
               console_missions=$15, live_practice_tasks=$16, sort_order=$17`,
        [
          cert.id,
          provider.id,
          cert.name || '',
          cert.shortName || cert.id,
          cert.displayName || cert.shortName || cert.id,
          cert.description || '',
          cert.hasPractice || false,
          cert.hasScenarios || false,
          cert.hasConsole || false,
          cert.hasLivePractice || false,
          JSON.stringify(cert.questions || []),
          JSON.stringify(cert.concepts || []),
          JSON.stringify(cert.scenarios || []),
          JSON.stringify(cert.practiceCommands || []),
          JSON.stringify(cert.consoleMissions || []),
          JSON.stringify(cert.livePracticeTasks || []),
          certOrder++,
        ]
      );
    }
  }

  console.log('\nMigración completada.');
}

// Si se ejecuta directamente (node db/migrate.js), correr y salir
if (require.main === module) {
  migrate()
    .then(() => pool.end())
    .catch(err => {
      console.error('Error en migración:', err);
      process.exit(1);
    });
}

module.exports = { migrate };
