// ============================================================
// script.js
// ============================================================
// Lógica principal del portal multi-certificación CertPrep.
// Gestiona portal, menú de certificación, test, simulacro, escenarios,
// práctica, consola, conceptos clave, validación, resumen y navegación.
// ============================================================

/* ============================================================
   ESTADO GLOBAL
   ============================================================ */

// Datos de certificaciones cargados desde la API (antes estaban en data/certifications.js)
let certifications = {};

let appState = {
  mode: 'portal',
  sourceMode: 'portal',
  currentQuestion: 0,
  answers: [],
  correctCount: 0,
  wrongCount: 0,
  testOrder: [],
  scenarioId: null,
  scenarioStep: 0,
};

let studyState = {
  providerId: null,
  certId: null,
  provider: null,
  cert: null,
};

let practiceActiveTab = 'terminal';
let practiceTypingInterval = null;
let consoleHistory = [];
let consoleCurrentMission = null;
let consoleHintIndex = 0;

let liveCurrentTask = null;
let liveHintIndex = 0;
let liveSolved = false;

let conceptsFilter = 'todos';
let conceptsSearch = '';
let flashcardIndex = 0;
let flashcardRevealed = false;

let simulacroConfig = {
  questionCount: 20,
  blindMode: false,
  timerSeconds: 90 * 60,
};
let simulacroTimerInterval = null;
let simulacroTimeRemaining = 90 * 60;

/* ============================================================
   SISTEMA MEJORADO DE PROGRESO Y APRENDIZAJE
   ============================================================ */

let focusMode = false;
let questionNotes = {}; // { certKey: { questionId: "nota" } }
let sessionHistory = []; // Array de sesiones completadas

// SRS (Spaced Repetition) - Algoritmo SM-2 simplificado
let srsData = {}; // { certKey: { questionId: { interval:1, repetitions:0, easiness:2.5, nextReview:timestamp } } }

// Sistema de logros
let achievements = {
  streak10: { id: 'streak10', name: 'Racha de 10', desc: '10 aciertos seguidos', icon: '🔥', unlocked: false },
  masterSELinux: { id: 'masterSELinux', name: 'Maestro de SELinux', desc: '100% en categoría SELinux', icon: '🛡️', unlocked: false },
  speedster: { id: 'speedster', name: 'Velocista', desc: 'Completar simulacro en <30 min', icon: '⚡', unlocked: false },
  perfectionist: { id: 'perfectionist', name: 'Perfeccionista', desc: 'Simulacro sin errores', icon: '💎', unlocked: false },
  firstBlood: { id: 'firstBlood', name: 'Primera Sangre', desc: 'Completar tu primera sesión', icon: '🎯', unlocked: false },
  comeBack: { id: 'comeBack', name: 'De vuelta', desc: 'Repetir preguntas falladas', icon: '🔄', unlocked: false },
  flashMaster: { id: 'flashMaster', name: 'Flash Master', desc: 'Revisar todas las flashcards', icon: '🎴', unlocked: false },
};

let currentStreak = 0;
let maxStreak = 0;

/* ============================================================
   ACCESORES DE DATOS POR CERTIFICACIÓN ACTIVA
   ============================================================ */

function getCurrentQuestions() {
  if (!studyState.cert) return [];
  return studyState.cert.questions || [];
}

function getCurrentConcepts() {
  if (!studyState.cert) return [];
  return studyState.cert.concepts || [];
}

function getCurrentScenarios() {
  if (!studyState.cert) return [];
  return studyState.cert.scenarios || [];
}

function getCurrentPracticeCommands() {
  if (!studyState.cert) return [];
  return studyState.cert.practiceCommands || [];
}

function getCurrentConsoleMissions() {
  if (!studyState.cert) return [];
  return studyState.cert.consoleMissions || [];
}

function getCurrentLivePracticeTasks() {
  if (!studyState.cert) return [];
  return studyState.cert.livePracticeTasks || [];
}

function getCertKey() {
  if (!studyState.providerId || !studyState.certId) return 'default';
  return `${studyState.providerId}_${studyState.certId}`;
}

/* ============================================================
   PERSISTENCIA VÍA API
   ============================================================ */

let progressCache = {};

function saveProgress() {
  const certKey = getCertKey();
  const data = {
    answers: appState.answers,
    correctCount: appState.correctCount,
    wrongCount: appState.wrongCount,
    completedScenarios: getCompletedScenarios(),
    timestamp: Date.now(),
  };
  progressCache[certKey] = data;
  API.saveProgress(certKey, data).catch(err => console.error('Error guardando progreso:', err));
}

function loadProgress() {
  return progressCache[getCertKey()] || null;
}

function getCompletedScenarios() {
  return progressCache[getCertKey()]?.completedScenarios || [];
}

function markScenarioCompleted(id) {
  const certKey = getCertKey();
  if (!progressCache[certKey]) progressCache[certKey] = { completedScenarios: [] };
  if (!progressCache[certKey].completedScenarios) progressCache[certKey].completedScenarios = [];
  if (!progressCache[certKey].completedScenarios.includes(id)) {
    progressCache[certKey].completedScenarios.push(id);
    saveProgress();
  }
}

function clearAllProgress() {
  const certKey = getCertKey();
  delete progressCache[certKey];
  API.clearProgress(certKey).catch(err => console.error('Error borrando progreso:', err));
}

/* ============================================================
   PERSISTENCIA MEJORADA: NOTAS, SRS, LOGROS, HISTORIAL
   ============================================================ */

function saveNotes() {
  API.saveNotes(questionNotes).catch(err => console.error('Error guardando notas:', err));
}

function saveSRS() {
  API.saveSRS(srsData).catch(err => console.error('Error guardando SRS:', err));
}

function saveHistory() {
  API.saveHistory(sessionHistory).catch(err => console.error('Error guardando historial:', err));
}

function saveAchievements() {
  const toSave = {};
  Object.keys(achievements).forEach(k => {
    toSave[k] = { unlocked: achievements[k].unlocked };
  });
  API.saveAchievements(toSave, maxStreak).catch(err => console.error('Error guardando logros:', err));
}

function getNote(certKey, questionId) {
  return (questionNotes[certKey] && questionNotes[certKey][questionId]) || '';
}

function setNote(certKey, questionId, text) {
  if (!questionNotes[certKey]) questionNotes[certKey] = {};
  questionNotes[certKey][questionId] = text;
  saveNotes();
}

// SRS: Algoritmo SM-2 simplificado
function getSRSQuestionData(certKey, questionId) {
  if (!srsData[certKey]) srsData[certKey] = {};
  if (!srsData[certKey][questionId]) {
    srsData[certKey][questionId] = { interval: 1, repetitions: 0, easiness: 2.5, nextReview: 0 };
  }
  return srsData[certKey][questionId];
}

function updateSRSForQuestion(certKey, questionId, isCorrect) {
  const data = getSRSQuestionData(certKey, questionId);
  if (isCorrect) {
    data.repetitions++;
    if (data.repetitions === 1) data.interval = 1;
    else if (data.repetitions === 2) data.interval = 3;
    else data.interval = Math.round(data.interval * data.easiness);
    data.easiness = Math.max(1.3, data.easiness + 0.1);
  } else {
    data.repetitions = 0;
    data.interval = 1;
    data.easiness = Math.max(1.3, data.easiness - 0.2);
  }
  const now = Date.now();
  data.nextReview = now + data.interval * 24 * 60 * 60 * 1000;
  data.lastReviewed = now;
  saveSRS();
}

function getDueSRSQuestions(certKey, questions) {
  const now = Date.now();
  if (!srsData[certKey]) return [];
  return questions.filter(q => {
    const data = srsData[certKey][q.id];
    return data && data.nextReview && data.nextReview <= now && data.repetitions < 5;
  });
}

function getSRSStats(certKey) {
  const data = srsData[certKey] || {};
  const now = Date.now();
  let due = 0, total = 0, mastered = 0;
  Object.values(data).forEach(d => {
    total++;
    if (d.nextReview && d.nextReview <= now) due++;
    if (d.repetitions >= 5) mastered++;
  });
  return { due, total, mastered };
}

// Logros
function checkAchievements(sessionData) {
  const certKey = getCertKey();
  const questions = getCurrentQuestions();
  let newUnlocks = [];

  // Primera sangre
  if (!achievements.firstBlood.unlocked && sessionHistory.length >= 1) {
    achievements.firstBlood.unlocked = true;
    newUnlocks.push(achievements.firstBlood);
  }

  // Racha de 10
  if (!achievements.streak10.unlocked && maxStreak >= 10) {
    achievements.streak10.unlocked = true;
    newUnlocks.push(achievements.streak10);
  }

  // Perfeccionista
  if (!achievements.perfectionist.unlocked && sessionData.wrong === 0 && sessionData.total > 10) {
    achievements.perfectionist.unlocked = true;
    newUnlocks.push(achievements.perfectionist);
  }

  // Velocista
  if (!achievements.speedster.unlocked && sessionData.duration && sessionData.duration < 30 * 60 && sessionData.total > 10) {
    achievements.speedster.unlocked = true;
    newUnlocks.push(achievements.speedster);
  }

  // Maestro de SELinux
  if (!achievements.masterSELinux.unlocked) {
    const selinuxAnswers = appState.answers.filter(a => {
      const q = questions.find(qItem => qItem.id === a.questionId);
      return q && q.category && q.category.toLowerCase().includes('selinux');
    });
    if (selinuxAnswers.length >= 3 && selinuxAnswers.every(a => a.correct)) {
      achievements.masterSELinux.unlocked = true;
      newUnlocks.push(achievements.masterSELinux);
    }
  }

  if (newUnlocks.length > 0) saveAchievements();
  return newUnlocks;
}

function showAchievementPopup(ach) {
  const popup = document.createElement('div');
  popup.className = 'achievement-popup';
  popup.innerHTML = `
    <div class="achievement-popup-icon">${ach.icon}</div>
    <div class="achievement-popup-text">
      <div class="achievement-popup-title">¡Logro desbloqueado!</div>
      <div class="achievement-popup-name">${ach.name}</div>
      <div class="achievement-popup-desc">${ach.desc}</div>
    </div>
  `;
  document.body.appendChild(popup);
  setTimeout(() => popup.classList.add('show'), 100);
  setTimeout(() => {
    popup.classList.remove('show');
    setTimeout(() => popup.remove(), 500);
  }, 4000);
}

// Exportar / Importar progreso completo
function exportFullProgress() {
  const data = {
    version: 2,
    timestamp: Date.now(),
    notes: questionNotes,
    srs: srsData,
    history: sessionHistory,
    achievements: Object.fromEntries(Object.entries(achievements).map(([k, v]) => [k, { unlocked: v.unlocked }])),
    maxStreak,
    theme: localStorage.getItem('skillforge_theme'),
  };
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `skillforge-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importFullProgress(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (!data.version) { reject('Archivo no válido'); return; }
        if (data.notes) { questionNotes = data.notes; saveNotes(); }
        if (data.srs) { srsData = data.srs; saveSRS(); }
        if (data.history) { sessionHistory = data.history; saveHistory(); }
        if (data.achievements) {
          Object.keys(data.achievements).forEach(k => {
            if (achievements[k]) achievements[k].unlocked = data.achievements[k].unlocked;
          });
          saveAchievements();
        }
        if (data.maxStreak) { maxStreak = data.maxStreak; saveAchievements(); }
        if (data.theme) {
          applyTheme(data.theme);
          API.saveTheme(data.theme).catch(() => {});
        }
        resolve(true);
      } catch (err) {
        reject(err.message);
      }
    };
    reader.readAsText(file);
  });
}

/* ============================================================
   DARK MODE
   ============================================================ */

function initDarkMode() {
  // Aplica el tema guardado en localStorage para carga instantánea
  const saved = localStorage.getItem('skillforge_theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = '☀️';
  }
}

function applyTheme(theme) {
  const html = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  if (theme === 'dark') {
    html.setAttribute('data-theme', 'dark');
    if (btn) btn.textContent = '☀️';
  } else {
    html.removeAttribute('data-theme');
    if (btn) btn.textContent = '🌙';
  }
  localStorage.setItem('skillforge_theme', theme);
}

function toggleDarkMode() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  applyTheme(newTheme);
  API.saveTheme(newTheme).catch(() => {});
}

/* ============================================================
   COMANDO DEL DÍA
   ============================================================ */

function getCommandOfTheDay() {
  const cmds = getCurrentPracticeCommands();
  const tasks = getCurrentLivePracticeTasks();
  const allCommands = [
    ...cmds.map(c => ({ command: c.command, desc: c.description })),
    ...tasks.map(t => ({ command: t.solution, desc: t.task })),
  ];
  if (allCommands.length === 0) return null;
  const dayIndex = new Date().getDate() % allCommands.length;
  return allCommands[dayIndex];
}

/* ============================================================
   UTILIDADES
   ============================================================ */

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function resetState() {
  appState.currentQuestion = 0;
  appState.answers = [];
  appState.correctCount = 0;
  appState.wrongCount = 0;
  appState.testOrder = [];
  appState.scenarioId = null;
  appState.scenarioStep = 0;
}

function getApp() {
  return document.getElementById('app');
}

function clearApp() {
  const app = getApp();
  if (!app) {
    console.error('Error: elemento #app no encontrado en el DOM');
    return null;
  }
  app.innerHTML = '';
  return app;
}

function escapeHtml(text) {
  if (typeof text !== 'string') return text;
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function getLevelClass(level) {
  if (!level) return 'medio';
  const l = level.toLowerCase();
  if (l === 'básico' || l === 'basico' || l === 'fácil' || l === 'facil') return 'básico';
  if (l === 'avanzado') return 'avanzado';
  return 'medio';
}

function getDifficultyClass(difficulty) {
  if (!difficulty) return 'medio';
  const d = difficulty.toLowerCase();
  if (d === 'básico' || d === 'basico' || d === 'fácil' || d === 'facil') return 'básico';
  if (d === 'avanzado') return 'avanzado';
  return 'medio';
}

/* ============================================================
   RENDER: PORTAL (SELECCIÓN DE PROVEEDOR)
   ============================================================ */

function renderPortal() {
  resetState();
  studyState = { providerId: null, certId: null, provider: null, cert: null };
  appState.mode = 'portal';
  const app = clearApp();

  const providers = Object.values(certifications);

  app.innerHTML = `
    <div class="fade-in">
      <h2 class="section-title">Selecciona un proveedor</h2>
      <p class="section-subtitle">Elige el proveedor de la certificación que quieres preparar</p>

      <div class="provider-grid">
        ${providers.map(p => `
          <div class="provider-card" onclick="selectProvider('${p.id}')" role="button" tabindex="0" aria-label="Seleccionar proveedor ${escapeHtml(p.name)}">
            <div class="provider-icon">${p.icon}</div>
            <h3 class="provider-name">${escapeHtml(p.name)}</h3>
            <p class="provider-count">${Object.keys(p.certifications).length} certificación${Object.keys(p.certifications).length > 1 ? 'es' : ''}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function selectProvider(providerId) {
  const provider = certifications[providerId];
  if (!provider) return;
  renderCertificationList(provider);
}

/* ============================================================
   RENDER: LISTA DE CERTIFICACIONES
   ============================================================ */

function renderCertificationList(provider) {
  appState.mode = 'provider';
  const app = clearApp();

  const certs = Object.values(provider.certifications);

  app.innerHTML = `
    <div class="fade-in">
      <h2 class="section-title">${provider.icon} ${escapeHtml(provider.name)}</h2>
      <p class="section-subtitle">Selecciona la certificación que quieres preparar</p>

      <div class="cert-grid">
        ${certs.map(c => `
          <div class="cert-card" onclick="selectCertification('${provider.id}', '${c.id}')" role="button" tabindex="0" aria-label="Seleccionar certificación ${escapeHtml(c.name)}">
            <h3 class="cert-card-title">${escapeHtml(c.shortName || c.name)}</h3>
            <p class="cert-card-name">${escapeHtml(c.name)}</p>
            <p class="cert-card-desc">${escapeHtml(c.description)}</p>
            <div class="cert-card-meta">
              <span class="cert-card-badge">${(c.questions || []).length} preguntas</span>
              ${(c.concepts || []).length > 0 ? `<span class="cert-card-badge">${c.concepts.length} conceptos</span>` : ''}
            </div>
          </div>
        `).join('')}
      </div>

      <div class="actions-row mt-xl" style="justify-content:center;">
        <button class="btn btn-secondary" onclick="renderPortal()">← Volver al portal</button>
      </div>
    </div>
  `;
}

function selectCertification(providerId, certId) {
  const provider = certifications[providerId];
  const cert = provider ? provider.certifications[certId] : null;
  if (!cert) return;

  studyState = { providerId, certId, provider, cert };
  renderCertificationMenu();
}

/* ============================================================
   RENDER: MENÚ DE CERTIFICACIÓN
   ============================================================ */

function renderCertificationMenu() {
  resetState();
  appState.mode = 'menu';
  const app = clearApp();

  const cert = studyState.cert;
  const provider = studyState.provider;
  const saved = loadProgress();
  const questionCount = (cert.questions || []).length;
  const conceptCount = (cert.concepts || []).length;
  const hasPractice = cert.hasPractice;
  const hasScenarios = cert.hasScenarios;
  const hasConsole = cert.hasConsole;
  const hasLivePractice = cert.hasLivePractice;

  const completedScenarios = getCompletedScenarios();
  const scenarioCount = (cert.scenarios || []).length;
  const scenarioProgress = scenarioCount > 0 ? Math.round((completedScenarios.length / scenarioCount) * 100) : 0;

  const cmdDay = getCommandOfTheDay();

  let menuItems = '';

  const srsStats = getSRSStats(getCertKey());
  const weakCategories = getWeakCategories();

  if (questionCount > 0) {
    menuItems += `
      <div class="menu-card" onclick="startTestMode()" role="button" tabindex="0" aria-label="Iniciar modo test">
        <div class="menu-card-icon">T</div>
        <h3 class="menu-card-title">Modo Test</h3>
        <p class="menu-card-desc">Practica pregunta por pregunta con feedback inmediato y explicaciones detalladas.</p>
      </div>
      <div class="menu-card" onclick="renderSimulacroConfig()" role="button" tabindex="0" aria-label="Iniciar modo simulacro">
        <div class="menu-card-icon">S</div>
        <h3 class="menu-card-title">Simulacro</h3>
        <p class="menu-card-desc">Responde todas las preguntas como en un examen real y obtén una valoración final.</p>
      </div>
      ${srsStats.due > 0 ? `
        <div class="menu-card" onclick="startSRSReview()" role="button" tabindex="0" aria-label="Repasar preguntas SRS">
          <div class="menu-card-icon">📅</div>
          <h3 class="menu-card-title">Repaso SRS</h3>
          <p class="menu-card-desc">Tienes ${srsStats.due} preguntas para repasar hoy. Sistema de repetición espaciada.</p>
        </div>
      ` : ''}
      ${weakCategories.length > 0 ? `
        <div class="menu-card" onclick="startWeakTopicExam()" role="button" tabindex="0" aria-label="Examen de refuerzo">
          <div class="menu-card-icon">🎯</div>
          <h3 class="menu-card-title">Examen de Refuerzo</h3>
          <p class="menu-card-desc">Genera un simulacro con tus temas débiles: ${weakCategories.slice(0, 3).map(c => c.category).join(', ')}...</p>
        </div>
      ` : ''}
    `;
  }

  menuItems += `
    <div class="menu-card" onclick="renderDashboard()" role="button" tabindex="0" aria-label="Ver dashboard de progreso">
      <div class="menu-card-icon">📊</div>
      <h3 class="menu-card-title">Dashboard</h3>
      <p class="menu-card-desc">Visualiza tu progreso con gráficos de radar, evolución por categoría y comparativas.</p>
    </div>
    <div class="menu-card" onclick="renderAchievements()" role="button" tabindex="0" aria-label="Ver logros">
      <div class="menu-card-icon">🏆</div>
      <h3 class="menu-card-title">Logros</h3>
      <p class="menu-card-desc">Desbloquea badges por tu rendimiento: rachas, perfección, velocidad y dominio de temas.</p>
    </div>
  `;

  if (hasScenarios && scenarioCount > 0) {
    menuItems += `
      <div class="menu-card" onclick="renderScenarios()" role="button" tabindex="0" aria-label="Ver escenarios prácticos">
        <div class="menu-card-icon">E</div>
        <h3 class="menu-card-title">Escenarios Prácticos</h3>
        <p class="menu-card-desc">Practica paso a paso escenarios reales: LVM, red, SELinux, recuperación de root, firewall... (${completedScenarios.length}/${scenarioCount} completados)</p>
      </div>
    `;
  }

  if (hasLivePractice && (cert.livePracticeTasks || []).length > 0) {
    menuItems += `
      <div class="menu-card" onclick="renderLivePractice()" role="button" tabindex="0" aria-label="Ver práctica en vivo">
        <div class="menu-card-icon">P</div>
        <h3 class="menu-card-title">Práctica en Vivo</h3>
        <p class="menu-card-desc">Laboratorio guiado: escribe comandos, comprueba si son correctos, recibe pistas progresivas y ve la solución.</p>
      </div>
    `;
  }

  if (hasConsole && (cert.consoleMissions || []).length > 0) {
    menuItems += `
      <div class="menu-card" onclick="renderConsole()" role="button" tabindex="0" aria-label="Ver consola viva">
        <div class="menu-card-icon">>_</div>
        <h3 class="menu-card-title">Consola Viva</h3>
        <p class="menu-card-desc">Terminal interactivo: escribe comandos reales, recibe feedback de error/éxito y consulta man pages dentro de la consola.</p>
      </div>
    `;
  }

  if (conceptCount > 0) {
    menuItems += `
      <div class="menu-card" onclick="renderConcepts()" role="button" tabindex="0" aria-label="Ver conceptos clave">
        <div class="menu-card-icon">C</div>
        <h3 class="menu-card-title">Conceptos Clave</h3>
        <p class="menu-card-desc">Revisa los conceptos fundamentales que debes dominar para el examen ${escapeHtml(cert.shortName || cert.name)}.</p>
      </div>
    `;
  }

  if (questionCount > 0) {
    menuItems += `
      <div class="menu-card" onclick="renderReviewPanel()" role="button" tabindex="0" aria-label="Revisar preguntas y respuestas">
        <div class="menu-card-icon">🔍</div>
        <h3 class="menu-card-title">Revisión QA</h3>
        <p class="menu-card-desc">Consulta todas las preguntas y respuestas correctas de forma organizada por categorías. Vista de solo lectura.</p>
      </div>
    `;
  }

  app.innerHTML = `
    <div class="fade-in">
      <div class="cert-header">
        <div class="cert-header-provider">${provider.icon} ${escapeHtml(provider.name)}</div>
        <h2 class="cert-header-title">${escapeHtml(cert.name)}</h2>
        <p class="cert-header-desc">${escapeHtml(cert.description)}</p>
        <div class="cert-header-meta">
          <span class="stat-pill neutral">${questionCount} preguntas</span>
          ${conceptCount > 0 ? `<span class="stat-pill neutral">${conceptCount} conceptos</span>` : ''}
        </div>
      </div>

      ${cmdDay ? `
        <div class="command-day-card">
          <div class="command-day-label">📌 Comando del día</div>
          <div class="command-day-cmd">${escapeHtml(cmdDay.command)}</div>
          <div class="command-day-desc">${escapeHtml(cmdDay.desc)}</div>
        </div>
      ` : ''}

      <div class="menu-grid">
        ${menuItems}
      </div>

      ${saved ? `
        <div class="card mt-xl" style="text-align:center;">
          <p style="color:var(--color-text-secondary);font-size:0.9rem;">
            📊 Última sesión: ${saved.correctCount} aciertos, ${saved.wrongCount} errores
            <br>
            <button class="btn btn-sm btn-secondary mt-md" onclick="clearAllProgress(); renderCertificationMenu();">Borrar progreso guardado</button>
          </p>
        </div>
      ` : ''}

      <div class="actions-row mt-xl" style="justify-content:center;flex-wrap:wrap;gap:var(--space-sm);">
        <button class="btn btn-secondary" onclick="renderPortal()">🏠 Volver al portal</button>
        <button class="btn btn-secondary" onclick="renderCertificationList(studyState.provider)">← Cambiar certificación</button>
        <button class="btn btn-secondary" onclick="exportFullProgress()">💾 Exportar progreso</button>
        <label class="btn btn-secondary" style="cursor:pointer;">
          📁 Importar progreso
          <input type="file" accept=".json" style="display:none;" onchange="handleImportFile(this)">
        </label>
      </div>
    </div>
  `;
}

/* ============================================================
   RENDER: MODO TEST
   ============================================================ */

function startTestMode(failedOnly = false) {
  resetState();
  appState.mode = 'test';
  appState.sourceMode = 'test';

  const questions = getCurrentQuestions();

  if (failedOnly) {
    const saved = loadProgress();
    if (saved && saved.answers && saved.answers.length > 0) {
      const failedIds = saved.answers.filter(a => !a.correct).map(a => a.questionId);
      const failedQuestions = questions.filter(q => failedIds.includes(q.id));
      if (failedQuestions.length > 0) {
        appState.testOrder = shuffleArray(failedQuestions);
        renderTestQuestion();
        return;
      }
    }
  }

  appState.testOrder = shuffleArray(questions);
  renderTestQuestion();
}

function renderTestQuestion() {
  const app = clearApp();
  const qIndex = appState.currentQuestion;
  const total = appState.testOrder.length;

  if (qIndex >= total) {
    appState.sourceMode = 'test';
    renderSummary();
    return;
  }

  const q = appState.testOrder[qIndex];
  const progressPct = ((qIndex) / total) * 100;
  const answered = appState.answers.find(a => a.questionId === q.id);
  const isAnswered = !!answered;

  app.innerHTML = `
    <div class="fade-in">
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${progressPct}%"></div>
      </div>
      <div class="progress-text">Pregunta ${qIndex + 1} de ${total}</div>

      <div class="stats-row">
        <span class="stat-pill success">✓ ${appState.correctCount} aciertos</span>
        <span class="stat-pill error">✗ ${appState.wrongCount} errores</span>
      </div>

      <div class="question-card">
        <div class="question-badges">
          <span class="question-category">${escapeHtml(q.category)}</span>
          <span class="badge-level ${getLevelClass(q.level || q.difficulty)}">${escapeHtml(q.level || q.difficulty || 'medio')}</span>
        </div>
        <p class="question-text">${escapeHtml(q.question)}</p>

        <div class="options-list">
          ${q.options.map((opt, idx) => {
            let cls = 'option-btn';
            let disabled = '';
            if (isAnswered) {
              disabled = 'disabled';
              if (idx === q.correctAnswer) {
                cls += ' correct';
              } else if (idx === answered.selected && idx !== q.correctAnswer) {
                cls += ' incorrect';
              } else {
                cls += ' disabled';
              }
            }
            return `
              <button class="${cls}" ${disabled} onclick="handleTestAnswer(${q.id}, ${idx})">
                <span class="option-letter">${String.fromCharCode(65 + idx)}</span>
                <span>${escapeHtml(opt)}</span>
              </button>
            `;
          }).join('')}
        </div>

        ${isAnswered ? `
          <div class="explanation-box">
            <strong>Explicación:</strong> ${escapeHtml(q.explanation)}
            ${q.command ? `<div class="question-command"><strong>Comando:</strong> <code>${escapeHtml(q.command)}</code></div>` : ''}
          </div>
        ` : ''}
      </div>

      <div class="actions-row">
        ${isAnswered ? `
          <button class="btn btn-primary" onclick="nextTestQuestion()">
            ${qIndex + 1 < total ? 'Siguiente pregunta →' : 'Ver resumen final'}
          </button>
        ` : '<button class="btn btn-secondary" disabled>Selecciona una respuesta</button>'}
        <button class="btn btn-secondary" onclick="renderCertificationMenu()">Volver al menú</button>
      </div>
    </div>
  `;
}

function handleTestAnswer(questionId, selectedIndex) {
  if (appState.answers.find(a => a.questionId === questionId)) return;

  const q = appState.testOrder[appState.currentQuestion];
  const isCorrect = selectedIndex === q.correctAnswer;

  appState.answers.push({
    questionId,
    selected: selectedIndex,
    correct: isCorrect,
  });

  if (isCorrect) {
    appState.correctCount++;
  } else {
    appState.wrongCount++;
  }

  renderTestQuestion();
}

function nextTestQuestion() {
  appState.currentQuestion++;
  renderTestQuestion();
}

/* ============================================================
   RENDER: MODO SIMULACRO
   ============================================================ */

function renderSimulacroConfig() {
  appState.mode = 'simulacro-config';
  const app = clearApp();

  app.innerHTML = `
    <div class="fade-in">
      <h2 class="section-title">Configurar simulacro</h2>
      <p class="section-subtitle">Elige cuántas preguntas quieres y si deseas modo examen ciego.</p>

      <div class="sim-config-card">
        <div class="sim-config-title">Número de preguntas</div>
        <div class="sim-config-options">
          ${[10, 20, 25].map(n => `
            <button class="sim-config-btn ${simulacroConfig.questionCount === n ? 'active' : ''}" onclick="setSimQuestionCount(${n})">${n}</button>
          `).join('')}
        </div>

        <div class="sim-config-toggle">
          <input type="checkbox" id="blind-mode" ${simulacroConfig.blindMode ? 'checked' : ''} onchange="toggleBlindMode()">
          <label for="blind-mode">🕶️ Modo examen ciego (sin barra de progreso ni contador)</label>
        </div>

        <div class="sim-config-toggle">
          <input type="checkbox" id="timer-mode" ${simulacroConfig.timerSeconds > 0 ? 'checked' : ''} onchange="toggleTimerMode()">
          <label for="timer-mode">⏱️ Temporizador (${Math.floor(simulacroConfig.timerSeconds / 60)} min)</label>
        </div>
      </div>

      <div class="actions-row" style="justify-content:center;">
        <button class="btn btn-success" onclick="startSimulacroMode()">🚀 Iniciar simulacro</button>
        <button class="btn btn-secondary" onclick="renderCertificationMenu()">← Volver al menú</button>
      </div>
    </div>
  `;
}

function setSimQuestionCount(n) {
  simulacroConfig.questionCount = n;
  renderSimulacroConfig();
}

function toggleBlindMode() {
  simulacroConfig.blindMode = !simulacroConfig.blindMode;
}

function toggleTimerMode() {
  simulacroConfig.timerSeconds = simulacroConfig.timerSeconds > 0 ? 0 : 90 * 60;
}

function startSimulacroMode() {
  resetState();
  appState.mode = 'simulacro';
  appState.sourceMode = 'simulacro';
  const all = shuffleArray(getCurrentQuestions());
  appState.testOrder = all.slice(0, Math.min(simulacroConfig.questionCount, all.length));
  simulacroTimeRemaining = simulacroConfig.timerSeconds;
  if (simulacroTimerInterval) clearInterval(simulacroTimerInterval);
  renderSimulacro();
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function renderSimulacro() {
  const app = clearApp();
  const total = appState.testOrder.length;
  const blind = simulacroConfig.blindMode;

  const timerHtml = simulacroConfig.timerSeconds > 0
    ? `<div class="timer-display" id="sim-timer">⏱️ ${formatTime(simulacroTimeRemaining)}</div>`
    : '';

  app.innerHTML = `
    <div class="fade-in">
      ${timerHtml}
      <h2 class="section-title">Simulacro de examen</h2>
      ${!blind ? `
        <div class="progress-bar">
          <div class="progress-fill" id="sim-progress" style="width: 0%"></div>
        </div>
        <div class="progress-text" id="sim-progress-text">0 de ${total} respondidas</div>
      ` : '<p class="section-subtitle">Modo examen ciego activado. Responde con calma.</p>'}

      <form id="sim-form" onsubmit="event.preventDefault(); finishSimulacro();">
        ${appState.testOrder.map((q, idx) => `
          <div class="card sim-question" id="sim-q-${q.id}">
            ${!blind ? `<div class="sim-question-number">Pregunta ${idx + 1} de ${total}</div>` : ''}
            <div class="question-badges">
              <span class="question-category">${escapeHtml(q.category)}</span>
              <span class="badge-level ${getLevelClass(q.level || q.difficulty)}">${escapeHtml(q.level || q.difficulty || 'medio')}</span>
            </div>
            <p class="question-text">${escapeHtml(q.question)}</p>

            <div class="options-list">
              ${q.options.map((opt, optIdx) => `
                <label class="option-btn" style="cursor:pointer;">
                  <input type="radio" name="q-${q.id}" value="${optIdx}" style="margin-right:0.5rem;" onchange="updateSimProgress()">
                  <span class="option-letter">${String.fromCharCode(65 + optIdx)}</span>
                  <span>${escapeHtml(opt)}</span>
                </label>
              `).join('')}
            </div>
          </div>
        `).join('')}

        <div class="actions-row">
          <button type="submit" class="btn btn-success">Finalizar simulacro</button>
          <button type="button" class="btn btn-secondary" onclick="renderCertificationMenu()">Volver al menú</button>
        </div>
      </form>
    </div>
  `;

  if (simulacroConfig.timerSeconds > 0) {
    simulacroTimerInterval = setInterval(() => {
      simulacroTimeRemaining--;
      const timerEl = document.getElementById('sim-timer');
      if (timerEl) {
        timerEl.textContent = `⏱️ ${formatTime(simulacroTimeRemaining)}`;
        if (simulacroTimeRemaining <= 60) timerEl.className = 'timer-display danger';
        else if (simulacroTimeRemaining <= 300) timerEl.className = 'timer-display warning';
      }
      if (simulacroTimeRemaining <= 0) {
        clearInterval(simulacroTimerInterval);
        finishSimulacro();
      }
    }, 1000);
  }
}

function updateSimProgress() {
  const total = appState.testOrder.length;
  const form = document.getElementById('sim-form');
  if (!form) return;

  const answered = appState.testOrder.filter(q => {
    const radios = form.elements[`q-${q.id}`];
    return radios && Array.from(radios).some(r => r.checked);
  }).length;

  const pct = (answered / total) * 100;
  const bar = document.getElementById('sim-progress');
  const text = document.getElementById('sim-progress-text');
  if (bar) bar.style.width = `${pct}%`;
  if (text) text.textContent = `${answered} de ${total} respondidas`;
}

function finishSimulacro() {
  if (simulacroTimerInterval) {
    clearInterval(simulacroTimerInterval);
    simulacroTimerInterval = null;
  }

  const total = appState.testOrder.length;
  const form = document.getElementById('sim-form');
  if (!form) return;

  const unanswered = appState.testOrder.filter(q => {
    const radios = form.elements[`q-${q.id}`];
    return !radios || !Array.from(radios).some(r => r.checked);
  });

  if (unanswered.length > 0) {
    alert(`Te faltan ${unanswered.length} preguntas por responder. Revisa el simulacro antes de finalizar.`);
    unanswered.forEach(q => {
      const el = document.getElementById(`sim-q-${q.id}`);
      if (el) {
        el.style.borderColor = 'var(--color-error)';
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
    return;
  }

  appState.testOrder.forEach(q => {
    const radios = form.elements[`q-${q.id}`];
    const selected = Array.from(radios).find(r => r.checked);
    const selectedIndex = selected ? parseInt(selected.value, 10) : -1;
    const isCorrect = selectedIndex === q.correctAnswer;

    appState.answers.push({
      questionId: q.id,
      selected: selectedIndex,
      correct: isCorrect,
    });

    if (isCorrect) {
      appState.correctCount++;
    } else {
      appState.wrongCount++;
    }
  });

  saveProgress();
  renderSummary();
}

/* ============================================================
   RENDER: RESUMEN FINAL
   ============================================================ */

function renderSummary() {
  appState.mode = 'summary';
  const app = clearApp();

  const total = appState.answers.length;
  const correct = appState.correctCount;
  const wrong = appState.wrongCount;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  let messageClass = 'bad';
  let messageText = 'Necesitas reforzar conceptos antes del examen.';
  if (percentage >= 90) {
    messageClass = 'good';
    messageText = 'Muy buen resultado. Vas muy bien preparado para el examen.';
  } else if (percentage >= 75) {
    messageClass = 'average';
    messageText = 'Buen nivel. Conviene repasar los errores antes del examen.';
  } else if (percentage >= 60) {
    messageClass = 'average';
    messageText = 'Nivel medio. Necesitas más práctica en los temas fallados.';
  }

  const questions = getCurrentQuestions();
  const mistakes = appState.answers.filter(a => !a.correct);
  const mistakesHtml = mistakes.length > 0
    ? mistakes.map(a => {
        const q = questions.find(qItem => qItem.id === a.questionId);
        if (!q) return '';
        const userOpt = q.options[a.selected] || 'Sin respuesta';
        const correctOpt = q.options[q.correctAnswer];
        return `
          <div class="mistake-item">
            <div class="mistake-item-question">${escapeHtml(q.question)}</div>
            <div class="mistake-item-answer">
              Tu respuesta: <span class="wrong">${escapeHtml(userOpt)}</span>
            </div>
            <div class="mistake-item-answer">
              Correcta: <span class="right">${escapeHtml(correctOpt)}</span>
            </div>
            <div class="mistake-item-explanation">${escapeHtml(q.explanation)}</div>
          </div>
        `;
      }).join('')
    : '<p class="text-center" style="color:var(--color-text-secondary)">¡Enhorabuena! No has cometido ningún error.</p>';

  const categoryStats = {};
  mistakes.forEach(a => {
    const q = questions.find(qItem => qItem.id === a.questionId);
    if (q) {
      categoryStats[q.category] = (categoryStats[q.category] || 0) + 1;
    }
  });
  const categoryHtml = Object.entries(categoryStats).length > 0
    ? Object.entries(categoryStats).map(([cat, count]) => `
        <div class="category-fail-item">
          <span>${escapeHtml(cat)}</span>
          <span class="category-fail-count">${count} fallo${count > 1 ? 's' : ''}</span>
        </div>
      `).join('')
    : '<p style="color:var(--color-text-secondary)">Sin errores por categoría.</p>';

  const isSimulacro = appState.sourceMode === 'simulacro';
  const repeatHandler = isSimulacro ? 'startSimulacroMode()' : 'startTestMode()';
  const repeatLabel = isSimulacro ? 'Repetir simulacro' : 'Repetir test';
  const certName = studyState.cert ? (studyState.cert.shortName || studyState.cert.name) : '';

  app.innerHTML = `
    <div class="fade-in">
      <h2 class="section-title">Resumen final — ${escapeHtml(certName)}</h2>

      <div class="summary-card">
        <div class="summary-score">${percentage}%</div>
        <div class="summary-score-label">de aciertos</div>

        <div class="summary-message ${messageClass}">${messageText}</div>

        <div class="summary-stats">
          <div class="summary-stat">
            <div class="summary-stat-value">${total}</div>
            <div class="summary-stat-label">Preguntas</div>
          </div>
          <div class="summary-stat">
            <div class="summary-stat-value" style="color:var(--color-success)">${correct}</div>
            <div class="summary-stat-label">Aciertos</div>
          </div>
          <div class="summary-stat">
            <div class="summary-stat-value" style="color:var(--color-error)">${wrong}</div>
            <div class="summary-stat-label">Errores</div>
          </div>
        </div>
      </div>

      ${Object.entries(categoryStats).length > 0 ? `
        <div class="card mt-xl" style="margin-bottom:var(--space-xl);">
          <h3 class="mistakes-title">Categorías a repasar</h3>
          ${categoryHtml}
        </div>
      ` : ''}

      <div class="mistakes-section">
        <h3 class="mistakes-title">Preguntas falladas (${mistakes.length})</h3>
        ${mistakesHtml}
      </div>

      <div class="actions-row mt-xl">
        <button class="btn btn-primary" onclick="${repeatHandler}">${repeatLabel}</button>
        ${mistakes.length > 0 ? `<button class="btn btn-success" onclick="startTestMode(true)">🔄 Repasar solo fallos</button>` : ''}
        <button class="btn btn-secondary" onclick="exportResults()">📋 Copiar resultados</button>
        <button class="btn btn-secondary" onclick="renderCertificationMenu()">← Volver al menú</button>
      </div>
    </div>
  `;
}

function exportResults() {
  const total = appState.answers.length;
  const correct = appState.correctCount;
  const wrong = appState.wrongCount;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const certName = studyState.cert ? studyState.cert.name : 'Certificación';

  const mistakes = appState.answers.filter(a => !a.correct);
  let text = `${certName} - Resultados\n`;
  text += `====================\n`;
  text += `Preguntas: ${total}\n`;
  text += `Aciertos: ${correct}\n`;
  text += `Errores: ${wrong}\n`;
  text += `Nota: ${percentage}%\n\n`;

  const questions = getCurrentQuestions();
  if (mistakes.length > 0) {
    text += `Preguntas falladas:\n`;
    mistakes.forEach(a => {
      const q = questions.find(qItem => qItem.id === a.questionId);
      if (q) {
        text += `- ${q.category}: ${q.question}\n`;
        text += `  Correcta: ${q.options[q.correctAnswer]}\n\n`;
      }
    });
  } else {
    text += `¡Sin errores!\n`;
  }

  navigator.clipboard.writeText(text).then(() => {
    alert('Resultados copiados al portapapeles');
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    alert('Resultados copiados al portapapeles');
  });
}

/* ============================================================
   RENDER: ESCENARIOS PRÁCTICOS
   ============================================================ */

function renderScenarios() {
  appState.mode = 'scenarios';
  const app = clearApp();
  const scenarios = getCurrentScenarios();
  const completed = getCompletedScenarios();

  app.innerHTML = `
    <div class="fade-in">
      <h2 class="section-title">Escenarios prácticos</h2>
      <p class="section-subtitle">Practica paso a paso escenarios reales del examen (${completed.length}/${scenarios.length} completados)</p>

      <div class="scenarios-grid">
        ${scenarios.map(s => {
          const isDone = completed.includes(s.id);
          return `
          <div class="scenario-card" onclick="startScenarioWizard(${s.id})" role="button" tabindex="0" aria-label="Iniciar escenario ${escapeHtml(s.title)}">
            <div style="display:flex;gap:var(--space-xs);align-items:center;flex-wrap:wrap;">
              <span class="scenario-card-category">${escapeHtml(s.category)}</span>
              <span class="badge-difficulty ${getDifficultyClass(s.difficulty)}">${escapeHtml(s.difficulty || 'medio')}</span>
              ${isDone ? '<span class="badge-level básico">✓ Completado</span>' : ''}
            </div>
            <h3 class="scenario-card-title">${escapeHtml(s.title)}</h3>
            <p class="scenario-card-desc">${escapeHtml(s.objective)}</p>
          </div>`;
        }).join('')}
      </div>

      <div class="actions-row mt-xl">
        <button class="btn btn-secondary" onclick="renderCertificationMenu()">← Volver al menú</button>
      </div>
    </div>
  `;
}

function startScenarioWizard(scenarioId) {
  appState.scenarioId = scenarioId;
  appState.scenarioStep = 0;
  appState.mode = 'scenario-wizard';
  renderScenarioStep();
}

function renderScenarioStep() {
  const app = clearApp();
  const scenario = getCurrentScenarios().find(s => s.id === appState.scenarioId);
  if (!scenario) {
    renderScenarios();
    return;
  }

  const stepIndex = appState.scenarioStep;
  const totalSteps = scenario.steps.length;
  const step = scenario.steps[stepIndex];

  const dotsHtml = scenario.steps.map((_, idx) => {
    let cls = 'wizard-dot';
    if (idx === stepIndex) cls += ' active';
    else if (idx < stepIndex) cls += ' completed';
    return `<div class="${cls}"></div>`;
  }).join('');

  const prevBtn = stepIndex > 0
    ? `<button class="btn btn-secondary" onclick="prevScenarioStep()">← Anterior</button>`
    : `<button class="btn btn-secondary" onclick="renderScenarios()">← Salir</button>`;

  const nextBtn = stepIndex + 1 < totalSteps
    ? `<button class="btn btn-primary" onclick="nextScenarioStep()">Siguiente →</button>`
    : `<button class="btn btn-success" onclick="finishScenarioWizard()">✓ Completar</button>`;

  app.innerHTML = `
    <div class="fade-in">
      <div class="wizard-header">
        <h2 class="section-title" style="margin-bottom:var(--space-sm)">${escapeHtml(scenario.title)}</h2>
        <p class="section-subtitle" style="margin-bottom:var(--space-lg)">${escapeHtml(scenario.objective)}</p>
        <div class="wizard-progress-dots">${dotsHtml}</div>
        <div class="progress-text">Paso ${stepIndex + 1} de ${totalSteps}</div>
      </div>

      <div class="wizard-step-card">
        <div class="wizard-step-number">Paso ${stepIndex + 1}</div>
        <p class="wizard-step-text">${escapeHtml(step)}</p>
      </div>

      <div class="wizard-actions">
        ${prevBtn}
        ${nextBtn}
      </div>
    </div>
  `;
}

function nextScenarioStep() {
  const scenario = getCurrentScenarios().find(s => s.id === appState.scenarioId);
  if (!scenario) return;
  if (appState.scenarioStep + 1 < scenario.steps.length) {
    appState.scenarioStep++;
    renderScenarioStep();
  }
}

function prevScenarioStep() {
  if (appState.scenarioStep > 0) {
    appState.scenarioStep--;
    renderScenarioStep();
  }
}

function finishScenarioWizard() {
  markScenarioCompleted(appState.scenarioId);
  const app = clearApp();
  app.innerHTML = `
    <div class="fade-in text-center">
      <div class="summary-card">
        <div class="summary-score" style="font-size:3rem">✓</div>
        <div class="summary-score-label" style="font-size:1.2rem; font-weight:700;">¡Escenario completado!</div>
        <div class="summary-message good" style="margin-top:var(--space-md)">
          Has repasado todos los pasos de este escenario práctico. Practica los comandos en una máquina real para afianzarlos.
        </div>
      </div>

      <div class="actions-row mt-xl">
        <button class="btn btn-primary" onclick="startScenarioWizard(${appState.scenarioId})">Repetir escenario</button>
        <button class="btn btn-secondary" onclick="renderScenarios()">Ver más escenarios</button>
        <button class="btn btn-secondary" onclick="renderCertificationMenu()">Menú principal</button>
      </div>
    </div>
  `;
}

/* ============================================================
   RENDER: PRÁCTICA EN VIVO (ANIMADA)
   ============================================================ */

function renderPractice() {
  appState.mode = 'practice';
  const app = clearApp();
  const cmds = getCurrentPracticeCommands();

  app.innerHTML = `
    <div class="fade-in">
      <h2 class="section-title">Práctica en vivo</h2>
      <p class="section-subtitle">Simula comandos reales del examen. Escoge uno para ver el terminal animado, ejemplos y la página man.</p>

      <div class="practice-grid">
        ${cmds.map(cmd => `
          <div class="practice-card" onclick="renderPracticeDetail(${cmd.id})" role="button" tabindex="0" aria-label="Practicar ${escapeHtml(cmd.title)}">
            <span class="practice-card-category">${escapeHtml(cmd.category)}</span>
            <h3 class="practice-card-title">${escapeHtml(cmd.title)}</h3>
            <p class="practice-card-desc">${escapeHtml(cmd.description)}</p>
          </div>
        `).join('')}
      </div>

      <div class="actions-row mt-xl">
        <button class="btn btn-secondary" onclick="renderCertificationMenu()">← Volver al menú</button>
      </div>
    </div>
  `;
}

function renderPracticeDetail(cmdId) {
  appState.mode = 'practice-detail';
  const app = clearApp();
  const cmd = getCurrentPracticeCommands().find(c => c.id === cmdId);
  if (!cmd) {
    renderPractice();
    return;
  }

  practiceActiveTab = 'terminal';
  if (practiceTypingInterval) {
    clearInterval(practiceTypingInterval);
    practiceTypingInterval = null;
  }

  app.innerHTML = `
    <div class="fade-in">
      <div class="practice-detail-header">
        <span class="practice-detail-category">${escapeHtml(cmd.category)}</span>
        <h2 class="practice-detail-title">${escapeHtml(cmd.title)}</h2>
        <p class="practice-detail-desc">${escapeHtml(cmd.description)}</p>
      </div>

      <div class="practice-tabs">
        <button class="practice-tab active" id="tab-terminal" onclick="switchPracticeTab('terminal', ${cmd.id})">🖥️ Terminal</button>
        <button class="practice-tab" id="tab-examples" onclick="switchPracticeTab('examples', ${cmd.id})">📋 Ejemplos</button>
        <button class="practice-tab" id="tab-man" onclick="switchPracticeTab('man', ${cmd.id})">📖 Man Page</button>
      </div>

      <div id="practice-content">
        ${renderTerminalContent(cmd)}
      </div>

      <div class="actions-row mt-xl">
        <button class="btn btn-primary" onclick="renderPracticeDetail(${cmd.id})">🔄 Repetir animación</button>
        <button class="btn btn-secondary" onclick="renderPractice()">← Más comandos</button>
        <button class="btn btn-secondary" onclick="renderCertificationMenu()">Menú principal</button>
      </div>
    </div>
  `;

  setTimeout(() => startTerminalTyping(cmd), 300);
}

function renderTerminalContent(cmd) {
  return `
    <div class="terminal-window">
      <div class="terminal-header">
        <div class="terminal-dot red"></div>
        <div class="terminal-dot yellow"></div>
        <div class="terminal-dot green"></div>
        <span class="terminal-title">${escapeHtml(cmd.prompt)} — ${escapeHtml(cmd.command)}</span>
      </div>
      <div class="terminal-body" id="terminal-body">
      </div>
    </div>
  `;
}

function renderExamplesContent(cmd) {
  return `
    <div class="practice-examples-list fade-in">
      <h3>Ejemplos de uso</h3>
      ${cmd.examples.map(ex => `
        <div class="practice-example-item">${escapeHtml(ex)}</div>
      `).join('')}
    </div>
  `;
}

function renderManPageContent(cmd) {
  return `
    <div class="man-page-window fade-in">
      <div class="man-page-header">
        <span>MAN(1) ${escapeHtml(cmd.category.toUpperCase())} — ${escapeHtml(cmd.title.split(' ')[0].toUpperCase())}(1)</span>
        <span>Manual del usuario</span>
      </div>
      <div class="man-page-body">${escapeHtml(cmd.manPage)}</div>
    </div>
  `;
}

function switchPracticeTab(tab, cmdId) {
  practiceActiveTab = tab;
  const cmd = getCurrentPracticeCommands().find(c => c.id === cmdId);
  if (!cmd) return;

  document.querySelectorAll('.practice-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(`tab-${tab}`).classList.add('active');

  if (tab !== 'terminal' && practiceTypingInterval) {
    clearInterval(practiceTypingInterval);
    practiceTypingInterval = null;
  }

  const container = document.getElementById('practice-content');
  if (!container) return;

  if (tab === 'terminal') {
    container.innerHTML = renderTerminalContent(cmd);
    setTimeout(() => startTerminalTyping(cmd), 100);
  } else if (tab === 'examples') {
    container.innerHTML = renderExamplesContent(cmd);
  } else if (tab === 'man') {
    container.innerHTML = renderManPageContent(cmd);
  }
}

function startTerminalTyping(cmd) {
  const body = document.getElementById('terminal-body');
  if (!body) return;

  body.innerHTML = '';

  const lines = [
    { type: 'prompt', text: cmd.prompt },
    { type: 'command', text: ' ' + cmd.command },
    { type: 'output', text: '\n' + cmd.simulatedOutput },
    { type: 'prompt', text: cmd.prompt },
    { type: 'cursor', text: '' }
  ];

  let lineIndex = 0;
  let charIndex = 0;
  let currentLineEl = null;

  if (practiceTypingInterval) clearInterval(practiceTypingInterval);

  practiceTypingInterval = setInterval(() => {
    if (lineIndex >= lines.length) {
      clearInterval(practiceTypingInterval);
      practiceTypingInterval = null;
      return;
    }

    const line = lines[lineIndex];

    if (charIndex === 0) {
      currentLineEl = document.createElement('div');
      currentLineEl.className = 'typing-line';
      if (line.type === 'prompt') currentLineEl.className += ' terminal-prompt';
      else if (line.type === 'command') currentLineEl.className += ' terminal-command';
      else if (line.type === 'output') currentLineEl.className += ' terminal-output';
      body.appendChild(currentLineEl);
    }

    if (line.type === 'cursor') {
      const cursor = document.createElement('span');
      cursor.className = 'terminal-cursor';
      currentLineEl.appendChild(cursor);
      lineIndex++;
      charIndex = 0;
      body.scrollTop = body.scrollHeight;
      return;
    }

    if (charIndex < line.text.length) {
      currentLineEl.textContent += line.text[charIndex];
      charIndex++;
      body.scrollTop = body.scrollHeight;
    } else {
      lineIndex++;
      charIndex = 0;
    }
  }, 35);
}

/* ============================================================
   RENDER: PRÁCTICA EN VIVO (LABORATORIO GUIADO)
   ============================================================ */

function renderLivePractice() {
  appState.mode = 'live-practice';
  const app = clearApp();
  const tasks = getCurrentLivePracticeTasks();

  app.innerHTML = `
    <div class="fade-in">
      <h2 class="section-title">Práctica en vivo</h2>
      <p class="section-subtitle">Laboratorio guiado: escribe el comando correcto, recibe pistas progresivas y comprueba tu respuesta.</p>

      <div class="practice-grid">
        ${tasks.map(t => `
          <div class="practice-card" onclick="renderLiveTask(${t.id})" role="button" tabindex="0" aria-label="Practicar ${escapeHtml(t.title)}">
            <span class="practice-card-category">${escapeHtml(t.category)}</span>
            <h3 class="practice-card-title">${escapeHtml(t.title)}</h3>
            <p class="practice-card-desc">${escapeHtml(t.task)}</p>
          </div>
        `).join('')}
      </div>

      <div class="actions-row mt-xl">
        <button class="btn btn-secondary" onclick="renderCertificationMenu()">← Volver al menú</button>
      </div>
    </div>
  `;
}

function renderLiveTask(taskId) {
  const task = getCurrentLivePracticeTasks().find(t => t.id === taskId);
  if (!task) return;

  liveCurrentTask = task;
  liveHintIndex = 0;
  liveSolved = false;
  appState.mode = 'live-task';
  const app = clearApp();

  app.innerHTML = `
    <div class="fade-in">
      <div class="console-mission-header">
        <span class="console-mission-category">${escapeHtml(task.category)}</span>
        <h2 class="console-mission-title">${escapeHtml(task.title)}</h2>
        <p class="console-mission-desc">${escapeHtml(task.task)}</p>
      </div>

      <div class="card" style="margin-bottom:var(--space-lg);">
        <div class="live-input-row">
          <span class="live-prompt">[root@server ~]#</span>
          <input type="text" class="live-input" id="live-input" autocomplete="off" spellcheck="false" placeholder="Escribe el comando aquí...">
          <button class="btn btn-primary btn-sm" onclick="checkLiveCommand()">Comprobar</button>
        </div>
        <div id="live-feedback" class="live-feedback hidden"></div>
      </div>

      <div class="live-hint-box" id="live-hint-box">
        <strong>💡 Pista 1/${task.hints.length}:</strong> ${escapeHtml(task.hints[0])}
        <br><br>
        <button class="btn btn-sm btn-secondary" id="live-next-hint" onclick="nextLiveHint()">Siguiente pista →</button>
      </div>

      <div class="actions-row">
        <button class="btn btn-secondary" onclick="renderLivePractice()">← Otra tarea</button>
        <button class="btn btn-secondary" onclick="showLiveSolution()">👁️ Ver solución</button>
        <button class="btn btn-secondary" onclick="renderCertificationMenu()">Menú principal</button>
      </div>
    </div>
  `;

  setTimeout(() => {
    const input = document.getElementById('live-input');
    if (input) input.focus();
  }, 100);
}

function nextLiveHint() {
  const task = liveCurrentTask;
  if (!task) return;
  liveHintIndex++;
  const box = document.getElementById('live-hint-box');
  if (!box) return;

  if (liveHintIndex < task.hints.length) {
    box.innerHTML = `
      <strong>💡 Pista ${liveHintIndex + 1}/${task.hints.length}:</strong> ${escapeHtml(task.hints[liveHintIndex])}
      <br><br>
      <button class="btn btn-sm btn-secondary" id="live-next-hint" onclick="nextLiveHint()">Siguiente pista →</button>
    `;
  } else {
    box.innerHTML = `
      <strong>💡 Última pista:</strong> ${escapeHtml(task.hints[task.hints.length - 1])}
      <br><br>
      <em style="color:var(--color-text-secondary)">No quedan más pistas. Intenta escribir el comando.</em>
    `;
  }
}

function checkLiveCommand() {
  const input = document.getElementById('live-input');
  const feedback = document.getElementById('live-feedback');
  if (!input || !feedback) return;

  const rawCmd = input.value.trim();
  if (!rawCmd) return;

  const task = liveCurrentTask;
  if (!task) return;

  const normalizedInput = rawCmd.replace(/\s+/g, ' ').trim().toLowerCase();
  const isValid = task.validCommands.some(valid => {
    const normalizedValid = valid.replace(/\s+/g, ' ').trim().toLowerCase();
    return normalizedInput === normalizedValid || normalizedValid.includes(normalizedInput);
  });

  feedback.classList.remove('hidden');
  if (isValid) {
    liveSolved = true;
    feedback.innerHTML = `
      <div class="live-feedback-success">✓ ¡Comando correcto!</div>
      <div class="live-feedback-solution"><strong>Solución:</strong> <code>${escapeHtml(task.solution)}</code></div>
    `;
  } else {
    feedback.innerHTML = `
      <div class="live-feedback-error">✗ Comando incorrecto. Revisa la sintaxis y vuelve a intentarlo.</div>
    `;
  }
}

function showLiveSolution() {
  const feedback = document.getElementById('live-feedback');
  if (!feedback) return;
  const task = liveCurrentTask;
  if (!task) return;

  feedback.classList.remove('hidden');
  feedback.innerHTML = `
    <div class="live-feedback-solution">
      <strong>👁️ Solución:</strong> <code>${escapeHtml(task.solution)}</code>
    </div>
  `;
}

/* ============================================================
   RENDER: CONSOLA VIVA (TERMINAL INTERACTIVO)
   ============================================================ */

function renderConsole() {
  appState.mode = 'console';
  const app = clearApp();
  const missions = getCurrentConsoleMissions();

  app.innerHTML = `
    <div class="fade-in">
      <h2 class="section-title">Consola Viva</h2>
      <p class="section-subtitle">Terminal interactivo. Elige una misión, escribe el comando correcto y recibe feedback. Usa 'man <comando>' para consultar ayuda.</p>

      <div class="missions-grid">
        ${missions.map(m => `
          <div class="mission-card" onclick="startConsoleMission(${m.id})" role="button" tabindex="0" aria-label="Iniciar misión ${escapeHtml(m.title)}">
            <span class="mission-card-category">${escapeHtml(m.category)}</span>
            <h3 class="mission-card-title">${escapeHtml(m.title)}</h3>
            <p class="mission-card-desc">${escapeHtml(m.mission)}</p>
          </div>
        `).join('')}
      </div>

      <div class="actions-row mt-xl">
        <button class="btn btn-secondary" onclick="renderCertificationMenu()">← Volver al menú</button>
      </div>
    </div>
  `;
}

function startConsoleMission(missionId) {
  const mission = getCurrentConsoleMissions().find(m => m.id === missionId);
  if (!mission) return;

  consoleCurrentMission = mission;
  consoleHistory = [];
  consoleHintIndex = 0;
  appState.mode = 'console-mission';
  renderConsoleMissionScreen();
}

function renderConsoleMissionScreen() {
  const app = clearApp();
  const m = consoleCurrentMission;

  app.innerHTML = `
    <div class="fade-in">
      <div class="console-mission-header">
        <span class="console-mission-category">${escapeHtml(m.category)}</span>
        <h2 class="console-mission-title">${escapeHtml(m.title)}</h2>
        <p class="console-mission-desc">${escapeHtml(m.mission)}</p>
        <div class="console-mission-hint" id="console-hint-box">
          <strong>💡 Pista 1/${m.hints.length}:</strong> ${escapeHtml(m.hints[0])}
          <br><br>
          <button class="btn btn-sm btn-secondary" id="next-hint-btn" onclick="nextConsoleHint()">Siguiente pista →</button>
        </div>
      </div>

      <div class="console-terminal">
        <div class="console-terminal-header">
          <div class="terminal-dot red"></div>
          <div class="terminal-dot yellow"></div>
          <div class="terminal-dot green"></div>
          <span class="terminal-title">${escapeHtml(m.prompt)} — Terminal interactivo</span>
        </div>
        <div class="console-terminal-body" id="console-body">
        </div>
        <div style="padding: 0 var(--space-md) var(--space-md);">
          <form class="console-input-line" onsubmit="event.preventDefault(); handleConsoleSubmit();">
            <span class="console-input-prompt">${escapeHtml(m.prompt)}</span>
            <input type="text" class="console-input-field" id="console-input" autocomplete="off" spellcheck="false" placeholder="Escribe un comando... (prueba: man systemctl)">
          </form>
        </div>
      </div>

      <div class="actions-row">
        <button class="btn btn-secondary" onclick="renderConsole()">← Otra misión</button>
        <button class="btn btn-secondary" onclick="renderCertificationMenu()">Menú principal</button>
      </div>
    </div>
  `;

  setTimeout(() => {
    const input = document.getElementById('console-input');
    if (input) input.focus();
  }, 100);
}

function nextConsoleHint() {
  const m = consoleCurrentMission;
  if (!m) return;
  consoleHintIndex++;
  const hintBox = document.getElementById('console-hint-box');
  if (!hintBox) return;

  if (consoleHintIndex < m.hints.length) {
    hintBox.innerHTML = `
      <strong>💡 Pista ${consoleHintIndex + 1}/${m.hints.length}:</strong> ${escapeHtml(m.hints[consoleHintIndex])}
      <br><br>
      <button class="btn btn-sm btn-secondary" id="next-hint-btn" onclick="nextConsoleHint()">Siguiente pista →</button>
    `;
  } else {
    hintBox.innerHTML = `
      <strong>💡 Última pista:</strong> ${escapeHtml(m.hints[m.hints.length - 1])}
      <br><br>
      <em style="color:var(--color-text-secondary)">No quedan más pistas. ¡Escribe el comando!</em>
    `;
  }
}

function handleConsoleSubmit() {
  const input = document.getElementById('console-input');
  if (!input) return;
  const rawCmd = input.value.trim();
  if (!rawCmd) return;
  input.value = '';

  const m = consoleCurrentMission;
  if (!m) return;

  consoleHistory.push({ type: 'prompt', text: m.prompt });
  consoleHistory.push({ type: 'command', text: ' ' + rawCmd });

  const cmdLower = rawCmd.toLowerCase();

  if (cmdLower.startsWith('man ')) {
    const manArg = rawCmd.slice(4).trim();
    const manText = m.manPages[manArg] || m.manPages[manArg.split(' ')[0]];
    if (manText) {
      consoleHistory.push({ type: 'man-page', text: manText });
    } else {
      consoleHistory.push({ type: 'error', text: `No manual entry for ${manArg}` });
    }
    renderConsoleHistory();
    scrollConsoleToBottom();
    return;
  }

  if (cmdLower === 'clear' || cmdLower === 'cls') {
    consoleHistory = [];
    renderConsoleHistory();
    return;
  }

  if (cmdLower === 'help' || cmdLower === '?') {
    consoleHistory.push({ type: 'output', text: `Comandos disponibles:\n  man <comando>    Consultar página de manual\n  clear           Limpiar terminal\n  help            Mostrar esta ayuda\n  exit            Volver a las misiones\n\nEscribe el comando que resuelve la misión.` });
    renderConsoleHistory();
    scrollConsoleToBottom();
    return;
  }

  if (cmdLower === 'exit' || cmdLower === 'quit') {
    renderConsole();
    return;
  }

  const isValid = m.validCommands.some(valid => {
    const normalizedValid = valid.replace(/\s+/g, ' ').trim().toLowerCase();
    const normalizedInput = rawCmd.replace(/\s+/g, ' ').trim().toLowerCase();
    return normalizedInput === normalizedValid || normalizedValid.includes(normalizedInput);
  });

  if (isValid) {
    consoleHistory.push({ type: 'output', text: m.simulatedOutput });
    consoleHistory.push({ type: 'success', text: m.successMessage });
    renderConsoleHistory();
    scrollConsoleToBottom();

    setTimeout(() => {
      const body = document.getElementById('console-body');
      if (body) {
        const nextDiv = document.createElement('div');
        nextDiv.className = 'console-line';
        nextDiv.innerHTML = `
          <div style="margin-top:var(--space-md);">
            <button class="btn btn-success" onclick="startConsoleMission(${m.id})">🔄 Repetir misión</button>
            <button class="btn btn-primary" onclick="renderConsole()">→ Siguiente misión</button>
          </div>
        `;
        body.appendChild(nextDiv);
        scrollConsoleToBottom();
      }
    }, 300);
  } else {
    consoleHistory.push({ type: 'error', text: `bash: ${rawCmd.split(' ')[0]}: comando no reconocido o incorrecto para esta misión.\n\nPrueba con: man <comando> para ver la ayuda.` });
    renderConsoleHistory();
    scrollConsoleToBottom();
  }
}

function renderConsoleHistory() {
  const body = document.getElementById('console-body');
  if (!body) return;

  body.innerHTML = consoleHistory.map(line => {
    const cls = `console-line ${line.type}`;
    return `<div class="${cls}">${escapeHtml(line.text)}</div>`;
  }).join('');
}

function scrollConsoleToBottom() {
  const body = document.getElementById('console-body');
  if (body) body.scrollTop = body.scrollHeight;
}

/* ============================================================
   RENDER: CONCEPTOS CLAVE
   ============================================================ */

function renderConcepts() {
  appState.mode = 'concepts';
  const app = clearApp();
  const keyConcepts = getCurrentConcepts();

  if (keyConcepts.length === 0) {
    app.innerHTML = `
      <div class="fade-in">
        <h2 class="section-title">Conceptos clave</h2>
        <p class="text-center" style="color:var(--color-text-secondary)">No hay conceptos clave disponibles para esta certificación.</p>
        <div class="actions-row mt-xl" style="justify-content:center;">
          <button class="btn btn-secondary" onclick="renderCertificationMenu()">← Volver al menú</button>
        </div>
      </div>
    `;
    return;
  }

  // Adaptación de conceptos para estructuras variadas (EX200 vs AI-900)
  const categories = [...new Set(keyConcepts.map(c => c.title))];
  const filterOptions = ['todos', ...categories];

  app.innerHTML = `
    <div class="fade-in">
      <h2 class="section-title">Conceptos clave</h2>
      <p class="section-subtitle">Repasa los términos, comandos, errores típicos y checklists fundamentales para el examen</p>

      <div class="actions-row" style="justify-content:center;margin-bottom:var(--space-lg);">
        <button class="btn btn-primary" onclick="renderFlashcards()">🎴 Modo Flashcards</button>
      </div>

      <div class="concepts-filter-bar">
        <input type="text" class="concepts-search" id="concepts-search" placeholder="🔍 Buscar concepto..." oninput="filterConcepts()">
        <div class="concepts-filter-buttons">
          ${filterOptions.map(f => `
            <button class="filter-btn ${f === conceptsFilter ? 'active' : ''}" onclick="setConceptsFilter('${f}')">${escapeHtml(f === 'todos' ? 'Todos' : f)}</button>
          `).join('')}
        </div>
      </div>

      <div class="concepts-grid" id="concepts-grid">
        ${renderConceptCards()}
      </div>

      <div class="actions-row mt-xl">
        <button class="btn btn-secondary" onclick="renderCertificationMenu()">← Volver al menú</button>
      </div>
    </div>
  `;

  setTimeout(() => {
    const search = document.getElementById('concepts-search');
    if (search) {
      search.value = conceptsSearch;
      search.focus();
    }
  }, 100);
}

function setConceptsFilter(filter) {
  conceptsFilter = filter;
  renderConcepts();
}

function filterConcepts() {
  const input = document.getElementById('concepts-search');
  conceptsSearch = input ? input.value.toLowerCase() : '';
  const grid = document.getElementById('concepts-grid');
  if (grid) grid.innerHTML = renderConceptCards();
}

function renderConceptCards() {
  let filtered = getCurrentConcepts();

  if (conceptsFilter !== 'todos') {
    filtered = filtered.filter(c => c.title === conceptsFilter);
  }

  if (conceptsSearch) {
    const s = conceptsSearch;
    filtered = filtered.filter(c => {
      const inTitle = c.title.toLowerCase().includes(s);
      const inDesc = (c.description || '').toLowerCase().includes(s);
      const inCommands = (c.commands || []).some(cmd => cmd.toLowerCase().includes(s));
      const inKeyPoints = (c.keyPoints || []).some(kp => kp.toLowerCase().includes(s));
      const inError = (c.typicalError || '').toLowerCase().includes(s);
      return inTitle || inDesc || inCommands || inKeyPoints || inError;
    });
  }

  if (filtered.length === 0) {
    return '<p class="text-center" style="color:var(--color-text-secondary);grid-column:1/-1;">No se encontraron conceptos con esos criterios.</p>';
  }

  return filtered.map(c => {
    // EX200 style concept
    if (c.commands && c.typicalError && c.checklist) {
      return `
        <div class="concept-card">
          <h3 class="concept-card-title">${escapeHtml(c.title)}</h3>
          <p class="concept-card-desc">${escapeHtml(c.description)}</p>

          <div class="concept-commands">
            <strong>Comandos:</strong>
            ${c.commands.map(cmd => `<div class="concept-command-item"><code>${escapeHtml(cmd)}</code></div>`).join('')}
          </div>

          <div class="concept-error">
            <strong>⚠️ Error típico:</strong> ${escapeHtml(c.typicalError)}
          </div>

          <div class="concept-checklist">
            <strong>✅ Checklist:</strong>
            <ul>
              ${c.checklist.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;
    }

    // AI-900 style concept
    if (c.keyPoints) {
      return `
        <div class="concept-card">
          <h3 class="concept-card-title">${escapeHtml(c.title)}</h3>
          <p class="concept-card-desc">${escapeHtml(c.description)}</p>

          <div class="concept-checklist">
            <strong>🔑 Puntos clave:</strong>
            <ul>
              ${c.keyPoints.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;
    }

    // Generic fallback
    return `
      <div class="concept-card">
        <h3 class="concept-card-title">${escapeHtml(c.title)}</h3>
        <p class="concept-card-desc">${escapeHtml(c.description)}</p>
      </div>
    `;
  }).join('');
}

/* ============================================================
   RENDER: FLASHCARDS
   ============================================================ */

function renderFlashcards() {
  appState.mode = 'flashcards';
  const app = clearApp();
  flashcardIndex = 0;
  flashcardRevealed = false;
  renderFlashcardCard(app);
}

function renderFlashcardCard(app) {
  const keyConcepts = getCurrentConcepts();
  if (keyConcepts.length === 0) {
    app.innerHTML = `
      <div class="fade-in">
        <h2 class="section-title">Flashcards</h2>
        <p class="text-center" style="color:var(--color-text-secondary)">No hay conceptos disponibles para flashcards.</p>
        <div class="actions-row mt-xl" style="justify-content:center;">
          <button class="btn btn-secondary" onclick="renderConcepts()">← Volver</button>
        </div>
      </div>
    `;
    return;
  }

  const c = keyConcepts[flashcardIndex];
  const total = keyConcepts.length;

  // Build back content depending on concept structure
  let backContent = '';
  if (c.description) {
    backContent += `<p class="concept-card-desc">${escapeHtml(c.description)}</p>`;
  }
  if (c.keyPoints && c.keyPoints.length > 0) {
    backContent += `
      <div class="concept-checklist">
        <strong>🔑 Puntos clave:</strong>
        <ul>${c.keyPoints.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
      </div>
    `;
  }
  if (c.commands && c.commands.length > 0) {
    backContent += `
      <div class="concept-commands">
        <strong>Comandos:</strong>
        ${c.commands.map(cmd => `<div class="concept-command-item"><code>${escapeHtml(cmd)}</code></div>`).join('')}
      </div>
    `;
  }
  if (c.typicalError) {
    backContent += `<div class="concept-error"><strong>⚠️ Error típico:</strong> ${escapeHtml(c.typicalError)}</div>`;
  }
  if (c.checklist && c.checklist.length > 0) {
    backContent += `
      <div class="concept-checklist">
        <strong>✅ Checklist:</strong>
        <ul>${c.checklist.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
      </div>
    `;
  }

  app.innerHTML = `
    <div class="fade-in">
      <h2 class="section-title">Flashcards</h2>
      <p class="flashcard-counter">${flashcardIndex + 1} de ${total}</p>

      <div class="flashcard-container">
        <div class="flashcard" onclick="toggleFlashcard()">
          ${!flashcardRevealed ? `
            <div class="flashcard-front">${escapeHtml(c.title)}</div>
            <p style="color:var(--color-text-secondary);margin-top:var(--space-md);">Pulsa para revelar</p>
          ` : `
            <div class="flashcard-back">
              <h3 class="concept-card-title">${escapeHtml(c.title)}</h3>
              ${backContent}
            </div>
          `}
        </div>
      </div>

      <div class="flashcard-controls">
        <button class="btn btn-secondary" onclick="prevFlashcard()">← Anterior</button>
        <button class="btn btn-primary" onclick="nextFlashcard()">Siguiente →</button>
        <button class="btn btn-secondary" onclick="renderConcepts()">Salir</button>
      </div>
    </div>
  `;
}

function toggleFlashcard() {
  flashcardRevealed = !flashcardRevealed;
  renderFlashcardCard(getApp());
}

function nextFlashcard() {
  const keyConcepts = getCurrentConcepts();
  if (flashcardIndex + 1 < keyConcepts.length) {
    flashcardIndex++;
    flashcardRevealed = false;
    renderFlashcardCard(getApp());
  }
}

function prevFlashcard() {
  if (flashcardIndex > 0) {
    flashcardIndex--;
    flashcardRevealed = false;
    renderFlashcardCard(getApp());
  }
}

/* ============================================================
   KEYBOARD SHORTCUTS
   ============================================================ */

document.addEventListener('keydown', (e) => {
  if (appState.mode === 'test') {
    if (e.key >= '1' && e.key <= '4') {
      const idx = parseInt(e.key, 10) - 1;
      const q = appState.testOrder[appState.currentQuestion];
      if (q) handleTestAnswer(q.id, idx);
    }
    if (e.key === 'Enter' || e.key === 'n' || e.key === 'N') {
      const answered = appState.answers.find(a => a.questionId === appState.testOrder[appState.currentQuestion]?.id);
      if (answered) nextTestQuestion();
    }
  }
  if (e.key === 'Escape') {
    if (appState.mode !== 'portal' && appState.mode !== 'provider') {
      if (studyState.cert) {
        renderCertificationMenu();
      } else {
        renderPortal();
      }
    }
  }
  if (appState.mode === 'flashcards') {
    if (e.key === 'ArrowRight') nextFlashcard();
    if (e.key === 'ArrowLeft') prevFlashcard();
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggleFlashcard();
    }
  }
});

/* ============================================================
   FUNCIONES AUXILIARES: CATEGORÍAS DÉBILES, SRS, DASHBOARD, LOGROS
   ============================================================ */

function getWeakCategories() {
  const saved = loadProgress();
  if (!saved || !saved.answers || saved.answers.length === 0) return [];
  const questions = getCurrentQuestions();
  const catStats = {};
  saved.answers.forEach(a => {
    const q = questions.find(q => q.id === a.questionId);
    if (!q) return;
    const cat = q.category || q.category || 'General';
    if (!catStats[cat]) catStats[cat] = { category: cat, wrong: 0, total: 0 };
    catStats[cat].total++;
    if (!a.correct) catStats[cat].wrong++;
  });
  return Object.values(catStats)
    .filter(c => c.wrong > 0)
    .sort((a, b) => (b.wrong / b.total) - (a.wrong / a.total));
}

function startWeakTopicExam() {
  const weakCats = getWeakCategories();
  if (weakCats.length === 0) {
    alert('No hay suficiente historial para generar un examen de refuerzo. Completa al menos un test primero.');
    return;
  }
  const weakCatNames = new Set(weakCats.map(c => c.category));
  const questions = getCurrentQuestions().filter(q => weakCatNames.has(q.category));
  if (questions.length === 0) {
    startTestMode();
    return;
  }
  resetState();
  appState.mode = 'test';
  appState.sourceMode = 'test';
  appState.testOrder = shuffleArray(questions);
  renderTestQuestion();
}

function startSRSReview() {
  const certKey = getCertKey();
  const allQuestions = getCurrentQuestions();
  const due = getDueSRSQuestions(certKey, allQuestions);
  if (due.length === 0) {
    alert('No hay preguntas SRS pendientes de repaso hoy. ¡Vuelve mañana!');
    return;
  }
  resetState();
  appState.mode = 'test';
  appState.sourceMode = 'srs';
  appState.testOrder = shuffleArray(due);
  renderTestQuestion();
}

function handleImportFile(input) {
  const file = input.files && input.files[0];
  if (!file) return;
  importFullProgress(file)
    .then(() => {
      showToast('Progreso importado correctamente.');
      renderCertificationMenu();
    })
    .catch(err => {
      alert('Error al importar: ' + err);
    });
}

function renderDashboard() {
  appState.mode = 'dashboard';
  const app = clearApp();
  const saved = loadProgress();
  const srsStats = getSRSStats(getCertKey());
  const weakCats = getWeakCategories();
  const cert = studyState.cert;

  const totalQ = (cert.questions || []).length;
  const answered = saved ? (saved.answers || []).length : 0;
  const correct = saved ? (saved.correctCount || 0) : 0;
  const wrong = saved ? (saved.wrongCount || 0) : 0;
  const pct = answered > 0 ? Math.round((correct / answered) * 100) : 0;

  const categoryRows = weakCats.slice(0, 8).map(c => {
    const catPct = Math.round(((c.total - c.wrong) / c.total) * 100);
    return `
      <div class="concept-card" style="padding:var(--space-sm) var(--space-md);">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span>${escapeHtml(c.category)}</span>
          <span class="stat-pill ${catPct >= 70 ? 'correct' : 'wrong'}">${catPct}% (${c.total - c.wrong}/${c.total})</span>
        </div>
      </div>`;
  }).join('');

  app.innerHTML = `
    <div class="fade-in">
      <h2 class="section-title">📊 Dashboard — ${escapeHtml(cert.shortName || cert.name)}</h2>
      <div class="stats-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:var(--space-md);margin-bottom:var(--space-xl);">
        <div class="card" style="text-align:center;">
          <div style="font-size:2rem;font-weight:700;color:var(--color-correct);">${correct}</div>
          <div style="color:var(--color-text-secondary);font-size:0.85rem;">Aciertos</div>
        </div>
        <div class="card" style="text-align:center;">
          <div style="font-size:2rem;font-weight:700;color:var(--color-wrong);">${wrong}</div>
          <div style="color:var(--color-text-secondary);font-size:0.85rem;">Errores</div>
        </div>
        <div class="card" style="text-align:center;">
          <div style="font-size:2rem;font-weight:700;">${pct}%</div>
          <div style="color:var(--color-text-secondary);font-size:0.85rem;">Precisión</div>
        </div>
        <div class="card" style="text-align:center;">
          <div style="font-size:2rem;font-weight:700;">${answered}/${totalQ}</div>
          <div style="color:var(--color-text-secondary);font-size:0.85rem;">Preguntas respondidas</div>
        </div>
        <div class="card" style="text-align:center;">
          <div style="font-size:2rem;font-weight:700;color:var(--color-accent);">${srsStats.due}</div>
          <div style="color:var(--color-text-secondary);font-size:0.85rem;">SRS pendientes</div>
        </div>
        <div class="card" style="text-align:center;">
          <div style="font-size:2rem;font-weight:700;">${srsStats.mastered}</div>
          <div style="color:var(--color-text-secondary);font-size:0.85rem;">Dominadas (SRS)</div>
        </div>
      </div>
      ${weakCats.length > 0 ? `
        <h3 class="section-title" style="font-size:1.1rem;">Categorías con más errores</h3>
        <div style="display:flex;flex-direction:column;gap:var(--space-xs);margin-bottom:var(--space-xl);">
          ${categoryRows}
        </div>
      ` : '<p style="color:var(--color-text-secondary);text-align:center;margin-bottom:var(--space-xl);">Completa al menos un test para ver estadísticas por categoría.</p>'}
      <div class="actions-row" style="justify-content:center;">
        <button class="btn btn-secondary" onclick="renderCertificationMenu()">← Volver al menú</button>
      </div>
    </div>
  `;
}

function renderAchievements() {
  appState.mode = 'achievements';
  const app = clearApp();
  const list = Object.values(achievements);

  const cards = list.map(a => `
    <div class="concept-card ${a.unlocked ? '' : 'opacity-50'}" style="display:flex;align-items:center;gap:var(--space-md);padding:var(--space-md);">
      <span style="font-size:2rem;">${a.icon}</span>
      <div>
        <div style="font-weight:600;${a.unlocked ? '' : 'color:var(--color-text-secondary);'}">${escapeHtml(a.name)}</div>
        <div style="font-size:0.85rem;color:var(--color-text-secondary);">${escapeHtml(a.desc)}</div>
        ${a.unlocked ? '<div style="font-size:0.75rem;color:var(--color-correct);margin-top:2px;">✓ Desbloqueado</div>' : '<div style="font-size:0.75rem;color:var(--color-text-secondary);margin-top:2px;">🔒 Bloqueado</div>'}
      </div>
    </div>
  `).join('');

  const unlocked = list.filter(a => a.unlocked).length;

  app.innerHTML = `
    <div class="fade-in">
      <h2 class="section-title">🏆 Logros — ${unlocked}/${list.length} desbloqueados</h2>
      <div style="display:flex;flex-direction:column;gap:var(--space-sm);margin-bottom:var(--space-xl);">
        ${cards}
      </div>
      <div class="actions-row" style="justify-content:center;">
        <button class="btn btn-secondary" onclick="renderCertificationMenu()">← Volver al menú</button>
      </div>
    </div>
  `;
}

/* ============================================================
   AUTENTICACIÓN
   ============================================================ */

let pendingPreToken = null;

function showAuthScreen() {
  document.getElementById('auth-screen').style.display = 'flex';
  document.querySelector('.app-header').style.display = 'none';
  document.getElementById('app').style.display = 'none';
  document.querySelector('.app-footer').style.display = 'none';
  showAuthMainCard();
}

function showAuthMainCard() {
  document.getElementById('auth-main-card').style.display = '';
  document.getElementById('auth-2fa-setup-card').style.display = 'none';
  document.getElementById('auth-2fa-verify-card').style.display = 'none';
}

function show2FASetupCard() {
  document.getElementById('auth-main-card').style.display = 'none';
  document.getElementById('auth-2fa-setup-card').style.display = '';
  document.getElementById('auth-2fa-verify-card').style.display = 'none';
}

function show2FAVerifyCard() {
  document.getElementById('auth-main-card').style.display = 'none';
  document.getElementById('auth-2fa-setup-card').style.display = 'none';
  document.getElementById('auth-2fa-verify-card').style.display = '';
  document.getElementById('auth-verify-code').value = '';
  document.getElementById('auth-verify-error').style.display = 'none';
  setTimeout(() => document.getElementById('auth-verify-code').focus(), 100);
}

function showApp() {
  document.getElementById('auth-screen').style.display = 'none';
  document.querySelector('.app-header').style.display = '';
  document.getElementById('app').style.display = '';
  document.querySelector('.app-footer').style.display = '';
  const userEl = document.getElementById('header-user');
  if (currentUser && userEl) {
    userEl.textContent = currentUser.displayName || currentUser.email;
  }
  const adminBtn = document.getElementById('admin-btn');
  if (adminBtn) adminBtn.style.display = currentUser && currentUser.is_admin ? '' : 'none';
}

function switchAuthTab(tab) {
  document.getElementById('auth-login-form').style.display = tab === 'login' ? '' : 'none';
  document.getElementById('auth-register-form').style.display = tab === 'register' ? '' : 'none';
  document.getElementById('tab-login').classList.toggle('active', tab === 'login');
  document.getElementById('tab-register').classList.toggle('active', tab === 'register');
  document.getElementById('auth-error').style.display = 'none';
  document.getElementById('auth-reg-error').style.display = 'none';
}

async function completeLogin(data) {
  setToken(data.token);
  currentUser = data.user;
  pendingPreToken = null;
  await loadAllUserData();
  showApp();
  renderPortal();
}

async function handleLogin() {
  const email = document.getElementById('auth-email').value.trim();
  const password = document.getElementById('auth-password').value;
  const errorEl = document.getElementById('auth-error');
  errorEl.style.display = 'none';

  if (!email || !password) {
    errorEl.textContent = 'Por favor, rellena todos los campos';
    errorEl.style.display = '';
    return;
  }

  const btn = document.querySelector('#auth-login-form .auth-submit');
  btn.disabled = true;
  btn.textContent = 'Entrando...';

  try {
    const data = await API.login(email, password);
    if (data.error) {
      errorEl.textContent = data.error;
      errorEl.style.display = '';
      return;
    }
    pendingPreToken = data.preToken;
    if (data.needsSetup) {
      await load2FASetup();
      show2FASetupCard();
    } else if (data.requires2fa) {
      show2FAVerifyCard();
    }
  } catch {
    errorEl.textContent = 'Error al conectar con el servidor.';
    errorEl.style.display = '';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Entrar';
  }
}

async function handleRegister() {
  const name = document.getElementById('auth-name').value.trim();
  const email = document.getElementById('auth-reg-email').value.trim();
  const password = document.getElementById('auth-reg-password').value;
  const password2 = document.getElementById('auth-reg-password2').value;
  const errorEl = document.getElementById('auth-reg-error');
  errorEl.style.display = 'none';

  if (!email || !password) {
    errorEl.textContent = 'Por favor, rellena el email y la contraseña';
    errorEl.style.display = '';
    return;
  }

  if (password !== password2) {
    errorEl.textContent = 'Las contraseñas no coinciden';
    errorEl.style.display = '';
    return;
  }

  const btn = document.querySelector('#auth-register-form .auth-submit');
  btn.disabled = true;
  btn.textContent = 'Creando cuenta...';

  try {
    const data = await API.register(email, password, name);
    if (data.error) {
      errorEl.textContent = data.error;
      errorEl.style.display = '';
      return;
    }
    pendingPreToken = data.preToken;
    await load2FASetup();
    show2FASetupCard();
  } catch {
    errorEl.textContent = 'Error al conectar con el servidor.';
    errorEl.style.display = '';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Crear cuenta';
  }
}

async function load2FASetup() {
  document.getElementById('auth-qr-img').src = '';
  document.getElementById('auth-manual-code').textContent = 'Cargando...';
  document.getElementById('auth-setup-code').value = '';
  document.getElementById('auth-setup-error').style.display = 'none';

  const data = await API.get2FASetup(pendingPreToken);
  if (data.qrDataUrl) document.getElementById('auth-qr-img').src = data.qrDataUrl;
  if (data.manualCode) document.getElementById('auth-manual-code').textContent = data.manualCode;
  setTimeout(() => document.getElementById('auth-setup-code').focus(), 300);
}

async function handleEnable2FA() {
  const code = document.getElementById('auth-setup-code').value.trim();
  const errorEl = document.getElementById('auth-setup-error');
  errorEl.style.display = 'none';

  if (!code || code.length !== 6) {
    errorEl.textContent = 'Introduce el código de 6 dígitos';
    errorEl.style.display = '';
    return;
  }

  const btn = document.querySelector('#auth-2fa-setup-card .auth-submit');
  btn.disabled = true;
  btn.textContent = 'Verificando...';

  try {
    const data = await API.enable2FA(code, pendingPreToken);
    if (data.error) {
      errorEl.textContent = data.error;
      errorEl.style.display = '';
      return;
    }
    await completeLogin(data);
  } catch {
    errorEl.textContent = 'Error al conectar con el servidor.';
    errorEl.style.display = '';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Activar 2FA y entrar';
  }
}

async function handleVerify2FA() {
  const code = document.getElementById('auth-verify-code').value.trim();
  const errorEl = document.getElementById('auth-verify-error');
  errorEl.style.display = 'none';

  if (!code || code.length !== 6) {
    errorEl.textContent = 'Introduce el código de 6 dígitos';
    errorEl.style.display = '';
    return;
  }

  const btn = document.querySelector('#auth-2fa-verify-card .auth-submit');
  btn.disabled = true;
  btn.textContent = 'Verificando...';

  try {
    const data = await API.verify2FA(code, pendingPreToken);
    if (data.error) {
      errorEl.textContent = data.error;
      errorEl.style.display = '';
      return;
    }
    await completeLogin(data);
  } catch {
    errorEl.textContent = 'Error al conectar con el servidor.';
    errorEl.style.display = '';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Verificar';
  }
}

function handleLogout() {
  clearToken();
  currentUser = null;
  pendingPreToken = null;
  progressCache = {};
  questionNotes = {};
  srsData = {};
  sessionHistory = [];
  Object.keys(achievements).forEach(k => { achievements[k].unlocked = false; });
  maxStreak = 0;
  currentStreak = 0;
  aiConfig.ollama = { enabled: false, url: 'http://localhost:11434', selectedModel: '', models: [] };
  aiConfig.openai = { enabled: false, apiKey: '', model: 'gpt-4o-mini' };
  aiConfig.claude = { enabled: false, apiKey: '', model: 'claude-3-haiku-20240307' };
  showAuthScreen();
}

function getAllCertKeys() {
  const keys = [];
  Object.values(certifications).forEach(provider => {
    Object.keys(provider.certifications).forEach(certId => {
      keys.push(`${provider.id}_${certId}`);
    });
  });
  return keys;
}

async function loadAllUserData() {
  // Primero cargamos el contenido para conocer las claves de cert
  certifications = await API.getContent();

  const certKeys = getAllCertKeys();
  const [enhanced, themeData, aiConfigData, ...progressResults] = await Promise.all([
    API.getEnhanced(),
    API.getTheme(),
    API.getAiConfig(),
    ...certKeys.map(k => API.getProgress(k).then(d => [k, d])),
  ]);

  if (enhanced.notes) questionNotes = enhanced.notes;
  if (enhanced.srs) srsData = enhanced.srs;
  if (enhanced.history) sessionHistory = enhanced.history;
  if (enhanced.achievements) {
    Object.keys(enhanced.achievements).forEach(k => {
      if (achievements[k]) achievements[k].unlocked = enhanced.achievements[k].unlocked;
    });
  }
  if (enhanced.maxStreak) maxStreak = enhanced.maxStreak;

  if (themeData.theme) applyTheme(themeData.theme);

  const cfg = aiConfigData;
  if (cfg.ollama) aiConfig.ollama = { ...aiConfig.ollama, ...cfg.ollama };
  if (cfg.openai) aiConfig.openai = { ...aiConfig.openai, ...cfg.openai };
  if (cfg.claude) aiConfig.claude = { ...aiConfig.claude, ...cfg.claude };

  progressCache = {};
  progressResults.forEach(([k, d]) => {
    if (d) progressCache[k] = d;
  });
}

/* ============================================================
   PANEL DE ADMINISTRACIÓN
   ============================================================ */

async function renderAdminPanel() {
  const app = document.getElementById('app');
  app.innerHTML = '<div class="admin-card"><p>Cargando usuarios...</p></div>';

  let users = [];
  try {
    const data = await API.getUsers();
    if (data.error) { app.innerHTML = `<div class="admin-card"><p class="auth-error">${data.error}</p></div>`; return; }
    users = data.users;
  } catch {
    app.innerHTML = '<div class="admin-card"><p class="auth-error">Error al cargar usuarios.</p></div>';
    return;
  }

  app.innerHTML = `
    <div class="admin-card">
      <h2>Gestión de usuarios</h2>

      <div class="admin-create-form">
        <h3>Crear nuevo usuario</h3>
        <div class="form-group">
          <input type="email" id="new-user-email" class="form-input" placeholder="Email" />
        </div>
        <div class="form-group">
          <input type="password" id="new-user-password" class="form-input" placeholder="Contraseña (mín. 6 caracteres)" />
        </div>
        <div class="form-group">
          <input type="text" id="new-user-name" class="form-input" placeholder="Nombre (opcional)" />
        </div>
        <label class="admin-check-label">
          <input type="checkbox" id="new-user-admin" /> Administrador
        </label>
        <div id="admin-create-error" class="auth-error" style="display:none;"></div>
        <div id="admin-create-ok" class="auth-success" style="display:none;">Usuario creado. Deberá configurar 2FA al primer inicio de sesión.</div>
        <button class="btn btn-primary" onclick="adminCreateUser()">Crear usuario</button>
      </div>

      <div class="admin-table-wrapper">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Nombre</th>
              <th>Admin</th>
              <th>2FA</th>
              <th>Activo</th>
              <th>Creado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody id="admin-users-tbody">
            ${users.map(u => adminUserRow(u)).join('')}
          </tbody>
        </table>
      </div>

      <div class="admin-actions">
        <button class="btn" onclick="renderPortal()">← Volver al portal</button>
      </div>
    </div>
  `;
}

function adminUserRow(u) {
  const isMe = currentUser && u.id === currentUser.id;
  return `
    <tr id="admin-row-${u.id}">
      <td>${escapeHtml(u.email)}</td>
      <td>${escapeHtml(u.display_name || '')}</td>
      <td>${u.is_admin ? '✅' : '—'}</td>
      <td>${u.totp_enabled ? '✅' : '❌'}</td>
      <td>${u.is_active ? '✅' : '❌'}</td>
      <td>${new Date(u.created_at).toLocaleDateString('es-ES')}</td>
      <td class="admin-row-actions">
        ${!u.totp_enabled ? `<button class="btn btn-xs" onclick="adminReset2FA(${u.id})" title="Resetear 2FA">Reset 2FA</button>` : `<button class="btn btn-xs" onclick="adminReset2FA(${u.id})" title="Resetear 2FA">Reset 2FA</button>`}
        ${!isMe ? `<button class="btn btn-xs" onclick="adminToggleActive(${u.id}, ${!u.is_active})">${u.is_active ? 'Desactivar' : 'Activar'}</button>` : ''}
        ${!isMe ? `<button class="btn btn-xs btn-danger" onclick="adminDeleteUser(${u.id}, '${escapeHtml(u.email)}')">Eliminar</button>` : ''}
      </td>
    </tr>
  `;
}

function escapeHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

async function adminCreateUser() {
  const email = document.getElementById('new-user-email').value.trim();
  const password = document.getElementById('new-user-password').value;
  const displayName = document.getElementById('new-user-name').value.trim();
  const isAdmin = document.getElementById('new-user-admin').checked;
  const errorEl = document.getElementById('admin-create-error');
  const okEl = document.getElementById('admin-create-ok');
  errorEl.style.display = 'none';
  okEl.style.display = 'none';

  if (!email || !password) { errorEl.textContent = 'Email y contraseña requeridos'; errorEl.style.display = ''; return; }

  const data = await API.createUser({ email, password, displayName, isAdmin });
  if (data.error) { errorEl.textContent = data.error; errorEl.style.display = ''; return; }

  okEl.style.display = '';
  document.getElementById('new-user-email').value = '';
  document.getElementById('new-user-password').value = '';
  document.getElementById('new-user-name').value = '';
  document.getElementById('new-user-admin').checked = false;

  const tbody = document.getElementById('admin-users-tbody');
  tbody.insertAdjacentHTML('beforeend', adminUserRow(data.user));
}

async function adminReset2FA(id) {
  if (!confirm('¿Resetear el 2FA de este usuario? Deberá configurarlo de nuevo al iniciar sesión.')) return;
  const data = await API.resetUser2FA(id);
  if (data.error) { alert(data.error); return; }
  await renderAdminPanel();
}

async function adminToggleActive(id, newActive) {
  const data = await API.updateUser(id, { isActive: newActive });
  if (data.error) { alert(data.error); return; }
  await renderAdminPanel();
}

async function adminDeleteUser(id, email) {
  if (!confirm(`¿Eliminar el usuario "${email}"? Esta acción no se puede deshacer.`)) return;
  const data = await API.deleteUser(id);
  if (data.error) { alert(data.error); return; }
  const row = document.getElementById(`admin-row-${id}`);
  if (row) row.remove();
}

/* ============================================================
   INICIALIZACIÓN
   ============================================================ */

document.addEventListener('DOMContentLoaded', async () => {
  initDarkMode();
  onAuthError = showAuthScreen;

  const token = getToken();
  if (!token) {
    showAuthScreen();
    return;
  }

  try {
    const { user, error } = await API.me();
    if (error) { showAuthScreen(); return; }
    currentUser = user;
    await loadAllUserData();
    showApp();
    renderPortal();
  } catch {
    showAuthScreen();
  }
});
