// data/certifications.js
// Agrega todos los proveedores desde sus archivos individuales.

const certifications = {
  ...require('./certifications/redhat'),
  ...require('./certifications/microsoft'),
  ...require('./certifications/datadog'),
};

// Variables globales de compatibilidad para EX200 (mantenidas para no romper referencias directas si existieran)
const questions = certifications.redhat.certifications.ex200.questions;
const keyConcepts = certifications.redhat.certifications.ex200.concepts;
const scenarios = certifications.redhat.certifications.ex200.scenarios;
const practiceCommands = certifications.redhat.certifications.ex200.practiceCommands;
const consoleMissions = certifications.redhat.certifications.ex200.consoleMissions;
const livePracticeTasks = certifications.redhat.certifications.ex200.livePracticeTasks;

// Exponer globalmente para compatibilidad con entornos de prueba (Node) y navegador
if (typeof globalThis !== 'undefined') {
  globalThis.certifications = certifications;
  globalThis.questions = questions;
  globalThis.keyConcepts = keyConcepts;
  globalThis.scenarios = scenarios;
  globalThis.practiceCommands = practiceCommands;
  globalThis.consoleMissions = consoleMissions;
  globalThis.livePracticeTasks = livePracticeTasks;
}

module.exports = certifications;
