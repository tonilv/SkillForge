/* ============================================================
   ESTUDIO INTELIGENTE — study.js
   Depende de: script.js (clearApp, escapeHtml, studyState,
   getCurrentQuestions, progressCache, getCertKey, saveProgress),
   ai-config.js (callAiProvider, getActiveProvider, getActiveProviderName),
   api.js (API)
   ============================================================ */

/* ── 1. TEMARIO ──────────────────────────────────────────────────────────── */

function renderTemario() {
  appState.mode = 'temario';
  setSidebarActive('temario');
  const app = clearApp();
  const cert = studyState.cert;
  const certKey = getCertKey();
  const questions = getCurrentQuestions();

  const byCategory = {};
  questions.forEach(q => {
    const cat = q.category || 'General';
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(q);
  });

  const categories = Object.keys(byCategory);
  const progress = progressCache[certKey] || {};
  const temaProgress = progress.temaProgress || {};
  const studied = categories.filter(c => temaProgress[c]).length;

  if (categories.length === 0) {
    app.innerHTML = `
      <div class="fade-in">
        <button class="btn btn-secondary" onclick="renderCertificationMenu()" style="margin-bottom:var(--space-md);">← Volver</button>
        <h2 class="section-title">📚 Temario — ${escapeHtml(cert.shortName || cert.name)}</h2>
        <p style="color:var(--color-text-secondary);text-align:center;">No hay temario disponible para esta certificación.</p>
      </div>`;
    return;
  }

  const blocks = categories.map(cat => {
    const qs = byCategory[cat];
    const done = !!temaProgress[cat];
    return `
      <div class="study-block ${done ? 'study-block--done' : ''}">
        <div class="study-block-header">
          <div class="study-block-info">
            <span class="study-block-icon">${done ? '✅' : '📖'}</span>
            <div>
              <div class="study-block-title">${escapeHtml(cat)}</div>
              <div class="study-block-meta">${qs.length} pregunta${qs.length !== 1 ? 's' : ''}</div>
            </div>
          </div>
          <button class="btn btn-sm ${done ? 'btn-secondary' : 'btn-primary'}"
            data-cat="${escapeHtml(cat)}" onclick="toggleTemaProgress(this.dataset.cat)">
            ${done ? 'Desmarcar' : 'Marcar como estudiado'}
          </button>
        </div>
      </div>`;
  }).join('');

  const pct = categories.length > 0 ? Math.round((studied / categories.length) * 100) : 0;

  app.innerHTML = `
    <div class="fade-in">
      <button class="btn btn-secondary" onclick="renderCertificationMenu()" style="margin-bottom:var(--space-md);">← Volver</button>
      <h2 class="section-title">📚 Temario — ${escapeHtml(cert.shortName || cert.name)}</h2>
      <p class="section-subtitle">${escapeHtml(cert.description || '')}</p>

      <div class="card" style="margin-bottom:var(--space-xl);">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-sm);">
          <span style="font-weight:600;">Progreso del temario</span>
          <span style="font-weight:700;color:var(--color-primary);">${studied}/${categories.length} bloques (${pct}%)</span>
        </div>
        <div style="background:var(--color-border);border-radius:4px;height:8px;">
          <div style="background:var(--color-primary);width:${pct}%;height:100%;border-radius:4px;transition:width .3s;"></div>
        </div>
      </div>

      <div class="study-blocks-list">${blocks}</div>

      <div class="actions-row" style="justify-content:center;margin-top:var(--space-xl);">
        <button class="btn btn-secondary" onclick="renderCertificationMenu()">← Volver al menú</button>
      </div>
    </div>`;
}

window.toggleTemaProgress = function(cat) {
  const certKey = getCertKey();
  if (!progressCache[certKey]) progressCache[certKey] = {};
  if (!progressCache[certKey].temaProgress) progressCache[certKey].temaProgress = {};
  const current = progressCache[certKey].temaProgress[cat];
  progressCache[certKey].temaProgress[cat] = !current;
  saveProgress();
  renderTemario();
};

/* ── 2. AÑADIR MATERIAL ──────────────────────────────────────────────────── */

let _studyMaterials = [];

async function renderAddMaterial() {
  appState.mode = 'addMaterial';
  setSidebarActive('material');
  const app = clearApp();
  const cert = studyState.cert;
  const certKey = getCertKey();

  app.innerHTML = `<div class="fade-in"><p style="color:var(--color-text-secondary);text-align:center;">Cargando material...</p></div>`;

  try {
    _studyMaterials = await API.getStudyMaterials(certKey);
  } catch {
    _studyMaterials = [];
  }

  _renderAddMaterialUI(cert, certKey);
}

function _renderAddMaterialUI(cert, certKey) {
  const app = document.getElementById('app');
  if (!app) return;

  const materialsHtml = _studyMaterials.length === 0
    ? `<p style="color:var(--color-text-secondary);text-align:center;padding:var(--space-xl);">Todavía no hay material de estudio cargado. Añade temario, enlaces, PDFs o apuntes para generar contenido inteligente.</p>`
    : _studyMaterials.map(m => `
        <div class="study-material-item">
          <div class="study-material-type study-material-type--${escapeHtml(m.type)}">${m.type === 'url' ? '🔗' : m.type === 'text' ? '📄' : '📝'} ${escapeHtml(m.type)}</div>
          <div class="study-material-body">
            ${m.title ? `<div class="study-material-title">${escapeHtml(m.title)}</div>` : ''}
            <div class="study-material-content">${escapeHtml(m.content)}</div>
          </div>
          <button class="btn btn-sm btn-danger" onclick="deleteStudyMaterial(${m.id})">🗑</button>
        </div>`).join('');

  app.innerHTML = `
    <div class="fade-in">
      <button class="btn btn-secondary" onclick="renderCertificationMenu()" style="margin-bottom:var(--space-md);">← Volver</button>
      <h2 class="section-title">📎 Añadir Material — ${escapeHtml(cert.shortName || cert.name)}</h2>

      <div class="card" style="margin-bottom:var(--space-xl);">
        <h3 style="font-weight:700;margin-bottom:var(--space-md);">Añadir nuevo material</h3>
        <div class="form-group">
          <select id="mat-type" class="form-input">
            <option value="note">📝 Nota / Apunte</option>
            <option value="url">🔗 Enlace / URL</option>
            <option value="text">📄 Texto largo</option>
          </select>
        </div>
        <div class="form-group">
          <input type="text" id="mat-title" class="form-input" placeholder="Título (opcional)" />
        </div>
        <div class="form-group">
          <textarea id="mat-content" class="form-input" rows="4" placeholder="Contenido, URL o apunte..."></textarea>
        </div>
        <div id="mat-error" class="auth-error" style="display:none;"></div>
        <button class="btn btn-primary" onclick="addStudyMaterial()">➕ Añadir</button>
      </div>

      <h3 style="font-weight:700;margin-bottom:var(--space-md);">Material guardado (${_studyMaterials.length})</h3>
      <div class="study-materials-list">${materialsHtml}</div>

      <div class="actions-row" style="justify-content:center;margin-top:var(--space-xl);">
        <button class="btn btn-secondary" onclick="renderCertificationMenu()">← Volver al menú</button>
      </div>
    </div>`;
}

window.addStudyMaterial = async function() {
  const type = document.getElementById('mat-type').value;
  const title = document.getElementById('mat-title').value.trim();
  const content = document.getElementById('mat-content').value.trim();
  const errorEl = document.getElementById('mat-error');
  errorEl.style.display = 'none';

  if (!content && !title) {
    errorEl.textContent = 'Introduce al menos un título o contenido.';
    errorEl.style.display = '';
    return;
  }

  try {
    const item = await API.addStudyMaterial(getCertKey(), { type, title, content });
    if (item.error) { errorEl.textContent = item.error; errorEl.style.display = ''; return; }
    _studyMaterials.push(item);
    _renderAddMaterialUI(studyState.cert, getCertKey());
  } catch {
    errorEl.textContent = 'Error al guardar.';
    errorEl.style.display = '';
  }
};

window.deleteStudyMaterial = async function(id) {
  if (!confirm('¿Eliminar este material?')) return;
  await API.deleteStudyMaterial(getCertKey(), id);
  _studyMaterials = _studyMaterials.filter(m => m.id !== id);
  _renderAddMaterialUI(studyState.cert, getCertKey());
};

/* ── 3. GENERAR APUNTES ──────────────────────────────────────────────────── */

async function renderGenerateNotes() {
  appState.mode = 'generateNotes';
  setSidebarActive('notes');
  const app = clearApp();
  const cert = studyState.cert;
  const provider = getActiveProvider();

  const materials = await API.getStudyMaterials(getCertKey()).catch(() => []);
  const categories = [...new Set(getCurrentQuestions().map(q => q.category || 'General'))];

  const noAI = !provider;
  const noContent = categories.length === 0 && materials.length === 0;

  app.innerHTML = `
    <div class="fade-in">
      <button class="btn btn-secondary" onclick="renderCertificationMenu()" style="margin-bottom:var(--space-md);">← Volver</button>
      <h2 class="section-title">📝 Generar Apuntes — ${escapeHtml(cert.shortName || cert.name)}</h2>
      <p class="section-subtitle">Genera apuntes detallados por bloque a partir del temario y material cargado.</p>

      ${noAI ? `<div class="card" style="border:1px solid var(--color-warning);margin-bottom:var(--space-xl);">
        <p style="color:var(--color-warning);">⚠️ No hay proveedor de IA configurado. <button class="btn btn-sm btn-secondary" onclick="renderConfigPanel()">⚙️ Configurar IA</button></p>
      </div>` : ''}

      ${noContent ? `<div class="card" style="margin-bottom:var(--space-xl);">
        <p style="color:var(--color-text-secondary);">Todavía no hay material de estudio cargado. Añade temario, enlaces o apuntes para generar contenido inteligente.</p>
      </div>` : ''}

      <div class="card" style="margin-bottom:var(--space-xl);">
        <h3 style="font-weight:700;margin-bottom:var(--space-md);">Bloques disponibles (${categories.length})</h3>
        <div style="display:flex;flex-wrap:wrap;gap:var(--space-sm);margin-bottom:var(--space-md);">
          ${categories.map(c => `<span class="badge-level">${escapeHtml(c)}</span>`).join('')}
        </div>
        <div class="form-group">
          <select id="notes-block" class="form-input">
            <option value="all">📚 Todos los bloques</option>
            ${categories.map(c => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('')}
          </select>
        </div>
        <button class="btn btn-primary" onclick="generateNotesAI()" ${noAI || noContent ? 'disabled' : ''}>
          🤖 Generar apuntes con IA (${getActiveProviderName()})
        </button>
      </div>

      <div id="notes-result"></div>

      <div class="actions-row" style="justify-content:center;margin-top:var(--space-xl);">
        <button class="btn btn-secondary" onclick="renderCertificationMenu()">← Volver al menú</button>
      </div>
    </div>`;
}

window.generateNotesAI = async function() {
  const cert = studyState.cert;
  const block = document.getElementById('notes-block')?.value || 'all';
  const provider = getActiveProvider();
  const resultEl = document.getElementById('notes-result');
  if (!resultEl) return;

  const questions = getCurrentQuestions();
  const filtered = block === 'all' ? questions : questions.filter(q => (q.category || 'General') === block);
  const materials = await API.getStudyMaterials(getCertKey()).catch(() => []);

  const prompt = `Eres un experto en certificaciones técnicas. Genera apuntes detallados para el examen "${escapeHtml(cert.name)}".
${block !== 'all' ? `Bloque: ${block}` : 'Incluye todos los bloques del temario.'}

TEMARIO (basado en categorías de preguntas):
${[...new Set(filtered.map(q => q.category || 'General'))].join(', ')}

MATERIAL ADICIONAL:
${materials.map(m => `[${m.type}] ${m.title || ''}: ${m.content}`).join('\n') || 'Sin material adicional.'}

PREGUNTAS DE REFERENCIA (muestra):
${filtered.slice(0, 15).map(q => `- ${q.question} → ${q.options[q.correctAnswer]}`).join('\n')}

Genera apuntes con:
1. Resumen del bloque
2. Conceptos clave con definiciones
3. Explicaciones detalladas
4. Ejemplos prácticos
5. Errores comunes
6. Tips para el examen

Usa Markdown con encabezados claros.`;

  resultEl.innerHTML = `<div class="test-result test-loading">🤖 Generando apuntes... esto puede tardar unos segundos.</div>`;

  try {
    const response = await callAiProvider(provider, prompt);
    resultEl.innerHTML = `
      <div class="card" style="margin-bottom:var(--space-xl);">
        <div style="display:flex;justify-content:flex-end;gap:var(--space-sm);margin-bottom:var(--space-md);">
          <button class="btn btn-sm btn-secondary" onclick="copyText('notes-md-content')">📋 Copiar</button>
          <button class="btn btn-sm btn-secondary" onclick="downloadText('notes-md-content','apuntes-${cert.shortName || 'cert'}.md')">⬇️ Descargar .md</button>
        </div>
        <pre id="notes-md-content" style="white-space:pre-wrap;font-family:inherit;line-height:1.6;">${escapeHtml(response)}</pre>
      </div>`;
  } catch (err) {
    resultEl.innerHTML = `<div class="test-result test-error">❌ Error: ${escapeHtml(err.message)}</div>`;
  }
};

/* ── 4. NOTEBOOKLM ───────────────────────────────────────────────────────── */

async function renderNotebookLM() {
  appState.mode = 'notebookLM';
  setSidebarActive('notebook');
  const app = clearApp();
  const cert = studyState.cert;
  const certKey = getCertKey();

  app.innerHTML = `<div class="fade-in"><p style="text-align:center;color:var(--color-text-secondary);">Preparando documento...</p></div>`;

  const materials = await API.getStudyMaterials(certKey).catch(() => []);
  const questions = getCurrentQuestions();
  const byCategory = {};
  questions.forEach(q => {
    const cat = q.category || 'General';
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(q);
  });

  const concepts = (cert.concepts || []).slice(0, 30);
  const certName = cert.name || cert.shortName || 'Certificación';

  let md = `# ${certName}\n\n`;
  md += `## Descripción general\n\n${cert.description || 'Certificación técnica profesional.'}\n\n`;
  md += `## Objetivos de la certificación\n\n`;
  md += Object.keys(byCategory).map(c => `- Dominar: ${c}`).join('\n') + '\n\n';
  md += `## Temario estructurado\n\n`;
  md += Object.keys(byCategory).map(c => `- ${c} (${byCategory[c].length} preguntas)`).join('\n') + '\n\n';

  Object.entries(byCategory).forEach(([cat, qs], idx) => {
    md += `## Bloque ${idx + 1}: ${cat}\n\n`;
    md += `### Resumen\n\n_Completa este bloque con tus apuntes sobre ${cat}._\n\n`;
    md += `### Conceptos clave\n\n`;
    const catConcepts = concepts.filter(c => c.category === cat || c.block === cat);
    if (catConcepts.length > 0) {
      md += catConcepts.map(c => `- **${c.term || c.title || c.name || ''}**: ${c.definition || c.description || c.content || ''}`).join('\n') + '\n';
    } else {
      md += `_Sin conceptos clave registrados para este bloque._\n`;
    }
    md += `\n### Explicación detallada\n\n_Añade aquí la explicación completa del bloque._\n\n`;
    md += `### Ejemplos prácticos\n\n_Añade ejemplos y casos de uso reales._\n\n`;
    const commands = qs.filter(q => q.command).slice(0, 5);
    if (commands.length > 0) {
      md += `### Comandos importantes\n\n` + commands.map(q => `\`\`\`\n${q.command}\n\`\`\``).join('\n') + '\n\n';
    }
    md += `### Preguntas de repaso\n\n`;
    md += qs.slice(0, 5).map((q, i) => `${i + 1}. ${q.question}\n   → **${q.options[q.correctAnswer]}**`).join('\n\n') + '\n\n';
    md += `### Posibles preguntas de examen\n\n`;
    md += qs.slice(5, 10).map((q, i) => `${i + 1}. ${q.question}`).join('\n') + '\n\n';
  });

  if (materials.length > 0) {
    md += `## Material adicional\n\n`;
    md += materials.map(m => `### ${m.title || m.type}\n\n${m.content}`).join('\n\n') + '\n\n';
  }

  if (concepts.length > 0) {
    md += `## Glosario\n\n`;
    md += concepts.slice(0, 20).map(c => `- **${c.term || c.title || c.name || ''}**: ${c.definition || c.description || c.content || ''}`).join('\n') + '\n\n';
  }

  md += `## Checklist final de estudio\n\n`;
  md += Object.keys(byCategory).map(c => `- [ ] ${c}`).join('\n') + '\n\n';
  md += `## Preguntas tipo examen\n\n`;
  const sample = questions.slice(0, 20);
  md += sample.map((q, i) => `**${i + 1}. ${q.question}**\n${q.options.map((o, oi) => `   ${String.fromCharCode(65 + oi)}. ${o}`).join('\n')}\n   ✓ Respuesta: ${q.options[q.correctAnswer]}`).join('\n\n') + '\n\n';
  md += `## Resumen final\n\n_Escribe aquí tu resumen personal de la certificación._\n`;

  app.innerHTML = `
    <div class="fade-in">
      <button class="btn btn-secondary" onclick="renderCertificationMenu()" style="margin-bottom:var(--space-md);">← Volver</button>
      <h2 class="section-title">🧠 Preparar para NotebookLM — ${escapeHtml(cert.shortName || cert.name)}</h2>
      <p class="section-subtitle">Documento Markdown listo para importar en Google NotebookLM, Notion u otra herramienta de estudio.</p>

      <div class="card" style="margin-bottom:var(--space-xl);">
        <div style="display:flex;gap:var(--space-sm);flex-wrap:wrap;margin-bottom:var(--space-md);">
          <button class="btn btn-primary" onclick="copyText('notebooklm-content')">📋 Copiar contenido</button>
          <button class="btn btn-secondary" onclick="downloadText('notebooklm-content','${(cert.shortName || 'cert').replace(/\s+/g,'-')}-notebooklm.md')">⬇️ Descargar .md</button>
          <button class="btn btn-secondary" onclick="downloadTxt('notebooklm-content','${(cert.shortName || 'cert').replace(/\s+/g,'-')}-estudio.txt')">📄 Exportar .txt</button>
        </div>
        <div style="font-size:0.8rem;color:var(--color-text-secondary);">
          ${questions.length} preguntas · ${Object.keys(byCategory).length} bloques · ${materials.length} materiales adicionales
        </div>
      </div>

      <div class="card">
        <pre id="notebooklm-content" style="white-space:pre-wrap;font-family:monospace;font-size:0.82rem;line-height:1.6;max-height:60vh;overflow-y:auto;">${escapeHtml(md)}</pre>
      </div>

      <div class="actions-row" style="justify-content:center;margin-top:var(--space-xl);">
        <button class="btn btn-secondary" onclick="renderCertificationMenu()">← Volver al menú</button>
      </div>
    </div>`;
}

/* ── 5. PREGUNTAS DESDE TEMARIO ──────────────────────────────────────────── */

function renderQuestionsFromTemario() {
  appState.mode = 'questionsFromTemario';
  setSidebarActive('questions');
  const app = clearApp();
  const cert = studyState.cert;
  const questions = getCurrentQuestions();
  const categories = [...new Set(questions.map(q => q.category || 'General'))];
  const provider = getActiveProvider();

  app.innerHTML = `
    <div class="fade-in">
      <button class="btn btn-secondary" onclick="renderCertificationMenu()" style="margin-bottom:var(--space-md);">← Volver</button>
      <h2 class="section-title">❓ Práctica por Temario — ${escapeHtml(cert.shortName || cert.name)}</h2>
      <p class="section-subtitle">Practica con preguntas reales filtradas por bloque, o genera nuevas con IA.</p>

      <div class="card" style="margin-bottom:var(--space-xl);">
        <div class="form-group">
          <label style="font-weight:600;margin-bottom:var(--space-xs);display:block;">Bloque / categoría</label>
          <select id="qtema-block" class="form-input">
            <option value="all">📚 Todo el temario (${questions.length})</option>
            ${categories.map(c => {
              const n = questions.filter(q => (q.category || 'General') === c).length;
              return `<option value="${escapeHtml(c)}">${escapeHtml(c)} (${n})</option>`;
            }).join('')}
          </select>
        </div>
        <div class="form-group">
          <label style="font-weight:600;margin-bottom:var(--space-xs);display:block;">Número de preguntas (máx. 5)</label>
          <div style="display:flex;gap:var(--space-sm);">
            ${[1,2,3,4,5].map(n => `<button class="btn btn-sm ${n===5?'btn-primary':'btn-secondary'} qtema-count-btn" onclick="setQTemaCount(this,${n})">${n}</button>`).join('')}
          </div>
          <input type="hidden" id="qtema-count" value="5">
        </div>
        <div style="display:flex;gap:var(--space-sm);flex-wrap:wrap;margin-top:var(--space-md);">
          <button class="btn btn-primary" onclick="startOfficialMiniTest()" ${questions.length === 0 ? 'disabled' : ''}>
            🎯 Practicar con preguntas reales
          </button>
          ${provider
            ? `<button class="btn btn-secondary" onclick="generateQuestionsFromTemario()">🤖 Generar con IA (${getActiveProviderName()})</button>`
            : `<button class="btn btn-secondary" onclick="renderConfigPanel()">⚙️ Configurar IA</button>`}
        </div>
      </div>

      <div id="qtema-result"></div>

      <div class="actions-row" style="justify-content:center;margin-top:var(--space-xl);">
        <button class="btn btn-secondary" onclick="renderCertificationMenu()">← Volver al menú</button>
      </div>
    </div>`;
}

window.setQTemaCount = function(btn, n) {
  document.getElementById('qtema-count').value = n;
  document.querySelectorAll('.qtema-count-btn').forEach(b => {
    b.classList.remove('btn-primary');
    b.classList.add('btn-secondary');
  });
  btn.classList.remove('btn-secondary');
  btn.classList.add('btn-primary');
};

window.startOfficialMiniTest = function() {
  const block = document.getElementById('qtema-block')?.value || 'all';
  const count = parseInt(document.getElementById('qtema-count')?.value || '5');
  const resultEl = document.getElementById('qtema-result');
  if (!resultEl) return;

  const allQ = getCurrentQuestions().filter(q => q.options && q.options.length >= 2 && q.correctAnswer !== undefined);
  let pool = block === 'all' ? [...allQ] : allQ.filter(q => (q.category || 'General') === block);

  if (pool.length === 0) {
    resultEl.innerHTML = `<div class="card"><p style="color:var(--color-text-secondary);">No hay preguntas disponibles en este bloque.</p></div>`;
    return;
  }

  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  window._miniTestState = {
    questions: pool.slice(0, Math.min(count, pool.length)),
    current: 0,
    correct: 0,
    answers: [],
  };
  _renderMiniTestQuestion();
};

function _renderMiniTestQuestion() {
  const state = window._miniTestState;
  const resultEl = document.getElementById('qtema-result');
  if (!resultEl || !state) return;

  if (state.current >= state.questions.length) {
    _renderMiniTestResults();
    return;
  }

  const q = state.questions[state.current];
  const qNum = state.current + 1;
  const total = state.questions.length;
  const letters = ['A', 'B', 'C', 'D'];

  resultEl.innerHTML = `
    <div class="card fade-in">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-md);">
        <span style="font-size:0.85rem;color:var(--color-text-secondary);">Pregunta ${qNum} de ${total}</span>
        ${q.category ? `<span class="badge-level básico">${escapeHtml(q.category)}</span>` : ''}
      </div>
      <p style="font-size:1.05rem;font-weight:600;margin-bottom:var(--space-lg);line-height:1.5;">${escapeHtml(q.question)}</p>
      <div class="options-list" id="mini-options">
        ${(q.options || []).map((opt, i) => `
          <button class="option-btn" data-idx="${i}" onclick="answerMiniTest(${i}, this)">
            <span class="option-letter">${letters[i]}</span>
            <span>${escapeHtml(opt)}</span>
          </button>`).join('')}
      </div>
      <div id="mini-feedback" style="display:none;margin-top:var(--space-lg);"></div>
    </div>`;
}

window.answerMiniTest = function(optionIndex, btn) {
  const state = window._miniTestState;
  if (!state) return;

  const q = state.questions[state.current];
  const correct = q.correctAnswer;
  const isCorrect = optionIndex === correct;

  if (isCorrect) state.correct++;
  state.answers.push({ chosen: optionIndex, isCorrect });

  document.querySelectorAll('#mini-options .option-btn').forEach((b, i) => {
    b.disabled = true;
    if (i === correct) b.classList.add('correct');
    else if (i === optionIndex && !isCorrect) b.classList.add('incorrect');
    else b.classList.add('disabled');
  });

  const feedbackEl = document.getElementById('mini-feedback');
  if (feedbackEl) {
    feedbackEl.style.display = '';
    const color = isCorrect ? 'var(--color-success)' : 'var(--color-error)';
    const bg = isCorrect ? 'var(--color-success-bg, #f0fdf4)' : 'var(--color-error-bg, #fef2f2)';
    feedbackEl.innerHTML = `
      <div style="padding:var(--space-md);border-radius:var(--radius-md);background:${bg};border-left:4px solid ${color};">
        <p style="font-weight:700;color:${color};">${isCorrect ? '✅ Correcto' : '❌ Incorrecto'}</p>
        ${q.explanation ? `<p style="font-size:0.9rem;margin-top:var(--space-xs);color:var(--color-text);">${escapeHtml(q.explanation)}</p>` : ''}
      </div>
      <button class="btn btn-primary" style="margin-top:var(--space-md);" onclick="nextMiniTest()">
        ${state.current + 1 < state.questions.length ? 'Siguiente →' : 'Ver resultados'}
      </button>`;
  }
};

window.nextMiniTest = function() {
  window._miniTestState.current++;
  _renderMiniTestQuestion();
};

function _renderMiniTestResults() {
  const state = window._miniTestState;
  const resultEl = document.getElementById('qtema-result');
  if (!resultEl) return;

  const total = state.questions.length;
  const correct = state.correct;
  const pct = Math.round((correct / total) * 100);
  const letters = ['A', 'B', 'C', 'D'];
  const pill = pct >= 80 ? 'success' : pct >= 50 ? 'neutral' : 'error';

  resultEl.innerHTML = `
    <div class="card fade-in">
      <h3 style="text-align:center;margin-bottom:var(--space-lg);">🏁 Resultado final</h3>
      <div style="text-align:center;padding:var(--space-xl);margin-bottom:var(--space-lg);background:var(--color-bg);border-radius:var(--radius-lg);">
        <div style="font-size:2.5rem;font-weight:700;color:var(--color-primary);">${correct}/${total}</div>
        <div style="font-size:1.2rem;font-weight:600;margin-top:var(--space-xs);">${pct}%</div>
        <div style="color:var(--color-text-secondary);margin-top:var(--space-xs);">${pct >= 80 ? '¡Excelente!' : pct >= 50 ? 'Puedes mejorar' : 'Sigue practicando'}</div>
      </div>
      <div style="display:flex;gap:var(--space-sm);justify-content:center;flex-wrap:wrap;margin-bottom:var(--space-xl);">
        <button class="btn btn-primary" onclick="startOfficialMiniTest()">🔄 Repetir</button>
        <button class="btn btn-secondary" onclick="renderQuestionsFromTemario()">← Nueva configuración</button>
      </div>
      <h4 style="margin-bottom:var(--space-md);">Revisión de respuestas</h4>
      ${state.questions.map((q, i) => {
        const ans = state.answers[i];
        const correctIdx = q.correctAnswer;
        return `
          <div style="margin-bottom:var(--space-md);padding:var(--space-md);border-radius:var(--radius-md);border-left:4px solid ${ans?.isCorrect ? 'var(--color-success)' : 'var(--color-error)'};">
            <p style="font-weight:600;margin-bottom:var(--space-xs);">${i + 1}. ${escapeHtml(q.question)}</p>
            <p style="font-size:0.88rem;color:var(--color-text-secondary);">
              Tu respuesta: <strong>${ans ? letters[ans.chosen] : '—'}</strong>
              ${ans?.isCorrect ? '✅' : `❌ — Correcta: <strong>${letters[correctIdx]}</strong> ${escapeHtml(q.options?.[correctIdx] || '')}`}
            </p>
            ${q.explanation ? `<p style="font-size:0.85rem;color:var(--color-text-secondary);margin-top:4px;">${escapeHtml(q.explanation)}</p>` : ''}
          </div>`;
      }).join('')}
    </div>`;
}

window.generateQuestionsFromTemario = async function() {
  const cert = studyState.cert;
  const block = document.getElementById('qtema-block')?.value || 'all';
  const count = document.getElementById('qtema-count')?.value || '5';
  const provider = getActiveProvider();
  const resultEl = document.getElementById('qtema-result');
  if (!resultEl || !provider) return;

  const questions = getCurrentQuestions();
  const filtered = block === 'all' ? questions : questions.filter(q => (q.category || 'General') === block);
  const materials = await API.getStudyMaterials(getCertKey()).catch(() => []);

  const prompt = `Eres un experto en certificaciones técnicas. Genera ${count} preguntas tipo test (4 opciones A/B/C/D) para el examen "${cert.name}".
${block !== 'all' ? `Bloque: ${block}` : 'Cubre varios bloques del temario.'}
Preguntas existentes (para no repetir): ${filtered.slice(0, 8).map(q => q.question).join(' | ')}
${materials.length ? `Material adicional: ${materials.map(m => m.title || m.content).slice(0, 3).join(', ')}` : ''}
Genera EXACTAMENTE ${count} preguntas nuevas con opciones A, B, C, D, respuesta correcta y explicación breve. Formato Markdown.`;

  resultEl.innerHTML = `<div class="test-result test-loading">🤖 Generando preguntas...</div>`;

  try {
    const response = await callAiProvider(provider, prompt);
    resultEl.innerHTML = `
      <div class="card">
        <div style="display:flex;justify-content:flex-end;gap:var(--space-sm);margin-bottom:var(--space-md);">
          <button class="btn btn-sm btn-secondary" onclick="copyText('qtema-output')">📋 Copiar</button>
          <button class="btn btn-sm btn-secondary" onclick="downloadTxt('qtema-output','preguntas.txt')">⬇️ Descargar</button>
        </div>
        <pre id="qtema-output" style="white-space:pre-wrap;font-family:inherit;line-height:1.6;">${escapeHtml(response)}</pre>
      </div>`;
  } catch (err) {
    resultEl.innerHTML = `<div class="test-result test-error">❌ Error: ${escapeHtml(err.message)}</div>`;
  }
};

/* ── 6. RESUMEN EXPRESS ──────────────────────────────────────────────────── */

function renderResumenExpress() {
  appState.mode = 'resumenExpress';
  setSidebarActive('resumen');
  const app = clearApp();
  const cert = studyState.cert;
  const certKey = getCertKey();
  const questions = getCurrentQuestions();
  const progress = progressCache[certKey] || {};
  const temaProgress = progress.temaProgress || {};

  const byCategory = {};
  questions.forEach(q => {
    const cat = q.category || 'General';
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(q);
  });

  const categories = Object.keys(byCategory);
  const answeredData = progress.answers || [];
  const wrongByCategory = {};
  answeredData.filter(a => !a.correct).forEach(a => {
    const q = questions.find(qItem => qItem.id === a.questionId);
    if (q) {
      const cat = q.category || 'General';
      wrongByCategory[cat] = (wrongByCategory[cat] || 0) + 1;
    }
  });

  const temasCriticos = Object.entries(byCategory)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 5);

  const comandosImportantes = questions
    .filter(q => q.command)
    .slice(0, 10);

  const pendientes = categories.filter(c => !temaProgress[c]);
  const estudiados = categories.filter(c => temaProgress[c]);

  const pct = progress.correctCount && progress.wrongCount
    ? Math.round((progress.correctCount / (progress.correctCount + progress.wrongCount)) * 100)
    : 0;

  app.innerHTML = `
    <div class="fade-in">
      <button class="btn btn-secondary" onclick="renderCertificationMenu()" style="margin-bottom:var(--space-md);">← Volver</button>
      <h2 class="section-title">⚡ Resumen Express — ${escapeHtml(cert.shortName || cert.name)}</h2>
      <p class="section-subtitle">Repasa lo más importante antes del examen.</p>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:var(--space-md);margin-bottom:var(--space-xl);">
        <div class="card" style="text-align:center;">
          <div style="font-size:2rem;font-weight:700;color:var(--color-primary);">${questions.length}</div>
          <div style="color:var(--color-text-secondary);font-size:0.85rem;">Preguntas totales</div>
        </div>
        <div class="card" style="text-align:center;">
          <div style="font-size:2rem;font-weight:700;color:var(--color-primary);">${categories.length}</div>
          <div style="color:var(--color-text-secondary);font-size:0.85rem;">Bloques del temario</div>
        </div>
        <div class="card" style="text-align:center;">
          <div style="font-size:2rem;font-weight:700;color:${pct >= 70 ? 'var(--color-success)' : 'var(--color-error)'};">${pct}%</div>
          <div style="color:var(--color-text-secondary);font-size:0.85rem;">Precisión acumulada</div>
        </div>
        <div class="card" style="text-align:center;">
          <div style="font-size:2rem;font-weight:700;color:var(--color-accent);">${estudiados.length}/${categories.length}</div>
          <div style="color:var(--color-text-secondary);font-size:0.85rem;">Bloques estudiados</div>
        </div>
      </div>

      ${temasCriticos.length > 0 ? `
        <div class="card" style="margin-bottom:var(--space-xl);">
          <h3 style="font-weight:700;margin-bottom:var(--space-md);">🎯 Temas críticos (más preguntas)</h3>
          ${temasCriticos.map(([cat, qs]) => {
            const fails = wrongByCategory[cat] || 0;
            return `<div style="display:flex;justify-content:space-between;align-items:center;padding:var(--space-sm) 0;border-bottom:1px solid var(--color-border);">
              <span>${escapeHtml(cat)}</span>
              <span style="display:flex;gap:var(--space-sm);">
                <span class="stat-pill neutral">${qs.length} preguntas</span>
                ${fails > 0 ? `<span class="stat-pill wrong">${fails} fallos</span>` : ''}
              </span>
            </div>`;
          }).join('')}
        </div>` : ''}

      ${comandosImportantes.length > 0 ? `
        <div class="card" style="margin-bottom:var(--space-xl);">
          <h3 style="font-weight:700;margin-bottom:var(--space-md);">💻 Comandos importantes</h3>
          <div style="display:flex;flex-direction:column;gap:var(--space-xs);">
            ${comandosImportantes.map(q => `
              <div style="background:var(--color-surface);padding:var(--space-sm) var(--space-md);border-radius:var(--radius-sm);font-family:monospace;">
                <code style="color:var(--color-primary);">${escapeHtml(q.command)}</code>
                <div style="font-size:0.8rem;color:var(--color-text-secondary);margin-top:2px;">${escapeHtml(q.question.slice(0, 80))}...</div>
              </div>`).join('')}
          </div>
        </div>` : ''}

      <div class="card" style="margin-bottom:var(--space-xl);">
        <h3 style="font-weight:700;margin-bottom:var(--space-md);">✅ Checklist de última revisión</h3>
        <div style="display:flex;flex-direction:column;gap:var(--space-sm);">
          ${categories.map(c => `
            <label style="display:flex;align-items:center;gap:var(--space-sm);cursor:pointer;">
              <input type="checkbox" ${temaProgress[c] ? 'checked' : ''} onchange="toggleTemaProgress(${JSON.stringify(c)})">
              <span style="${temaProgress[c] ? 'text-decoration:line-through;color:var(--color-text-secondary);' : ''}">${escapeHtml(c)}</span>
              <span class="stat-pill neutral" style="margin-left:auto;">${byCategory[c].length}p</span>
            </label>`).join('')}
        </div>
      </div>

      ${pendientes.length > 0 ? `
        <div class="card" style="border:1px solid var(--color-error);margin-bottom:var(--space-xl);">
          <h3 style="font-weight:700;color:var(--color-error);margin-bottom:var(--space-sm);">⚠️ Bloques pendientes de estudiar (${pendientes.length})</h3>
          <p style="color:var(--color-text-secondary);">${pendientes.map(c => escapeHtml(c)).join(' · ')}</p>
        </div>` : `
        <div class="card" style="border:1px solid var(--color-success);margin-bottom:var(--space-xl);">
          <p style="color:var(--color-success);font-weight:600;">🎉 ¡Todos los bloques marcados como estudiados! Estás listo para el examen.</p>
        </div>`}

      <div class="actions-row" style="justify-content:center;margin-top:var(--space-xl);">
        <button class="btn btn-secondary" onclick="renderCertificationMenu()">← Volver al menú</button>
      </div>
    </div>`;
}

/* ── UTILIDADES COMPARTIDAS ──────────────────────────────────────────────── */

window.copyText = function(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  navigator.clipboard.writeText(el.textContent).then(() => {
    const btn = event.target;
    const orig = btn.textContent;
    btn.textContent = '✅ Copiado';
    setTimeout(() => { btn.textContent = orig; }, 2000);
  }).catch(() => alert('No se pudo copiar. Selecciona el texto manualmente.'));
};

window.downloadText = function(elementId, filename) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const blob = new Blob([el.textContent], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
};

window.downloadTxt = function(elementId, filename) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const blob = new Blob([el.textContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
};
