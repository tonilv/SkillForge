// ============================================================
// ai-config.js
// ============================================================
// Panel de configuración de IA y revisión de preguntas.
// Gestiona Ollama (local), OpenAI, Claude y vista de revisión.
// ============================================================

/* ============================================================
   ESTADO DE CONFIGURACIÓN DE IA
   ============================================================ */

let aiConfig = {
  selectedProvider: null,
  ollama: {
    enabled: false,
    url: 'http://localhost:11434',
    selectedModel: '',
    models: [],
  },
  openai: {
    enabled: false,
    apiKey: '',
    model: 'gpt-4o-mini',
  },
  claude: {
    enabled: false,
    apiKey: '',
    model: 'claude-3-haiku-20240307',
  },
  openai_compatible: {
    enabled: false,
    url: '',
    model: '',
    apiKey: '',
  },
};

let configActiveTab = 'ollama';

// Estado para selección de preguntas en revisión
let reviewSelectedIds = new Set();
// Categorías activas (visibles) en Revisión QA
let reviewActiveCategories = new Set();

function toggleReviewSelection(qid) {
  if (reviewSelectedIds.has(qid)) {
    reviewSelectedIds.delete(qid);
  } else {
    reviewSelectedIds.add(qid);
  }
  updateReviewSelectionUI();
}

function selectAllReview(questions) {
  questions.forEach(q => reviewSelectedIds.add(q.id));
  updateReviewSelectionUI();
}

function deselectAllReview() {
  reviewSelectedIds.clear();
  updateReviewSelectionUI();
}

function selectCategoryReview(catQuestions) {
  catQuestions.forEach(q => reviewSelectedIds.add(q.id));
  updateReviewSelectionUI();
}

function deselectCategoryReview(catQuestions) {
  catQuestions.forEach(q => reviewSelectedIds.delete(q.id));
  updateReviewSelectionUI();
}

function updateReviewSelectionUI() {
  document.querySelectorAll('.review-checkbox').forEach(cb => {
    const qid = parseInt(cb.dataset.qid, 10);
    cb.checked = reviewSelectedIds.has(qid);
  });
  const count = reviewSelectedIds.size;
  const badge = document.getElementById('review-selection-count');
  if (badge) badge.textContent = `${count} seleccionada${count !== 1 ? 's' : ''}`;

  // Actualizar chips de categoría
  document.querySelectorAll('.category-chip').forEach(chip => {
    const catName = chip.querySelector('.category-chip-name')?.textContent;
    if (!catName || !window._reviewByCategory) return;
    const catQuestions = window._reviewByCategory[catName];
    if (!catQuestions) return;
    const allSelected = catQuestions.every(q => reviewSelectedIds.has(q.id));
    chip.classList.toggle('selected', allSelected);
  });

  // Actualizar botón de revisión
  const btn = document.getElementById('ai-review-btn');
  if (btn) {
    btn.textContent = `🤖 Revisar ${count} con IA`;
  }
}

function toggleCategoryFilter(chipEl) {
  const catName = chipEl.dataset.cat;
  if (!catName || !window._reviewByCategory) return;

  const allCats = Object.keys(window._reviewByCategory);
  const isExclusive = reviewActiveCategories.size === 1 && reviewActiveCategories.has(catName);

  if (isExclusive) {
    // Ya es la única activa → volver a mostrar todas
    allCats.forEach(c => reviewActiveCategories.add(c));
  } else {
    // Seleccionar esta en exclusiva, ocultar el resto
    reviewActiveCategories.clear();
    reviewActiveCategories.add(catName);
  }

  // Actualizar visibilidad de secciones y estado de chips
  document.querySelectorAll('.category-chip').forEach(chip => {
    const cat = chip.dataset.cat;
    if (!cat) return;
    const active = reviewActiveCategories.has(cat);
    chip.classList.toggle('selected', active);
    const sectionId = 'review-section-' + cat.replace(/[^a-z0-9]/gi, '_');
    const section = document.getElementById(sectionId);
    if (section) section.style.display = active ? '' : 'none';
  });

  // Actualizar contador
  const visibleCount = [...reviewActiveCategories].reduce((sum, c) => {
    return sum + (window._reviewByCategory[c]?.length || 0);
  }, 0);
  const badge = document.getElementById('review-selection-count');
  if (badge) badge.textContent = String(visibleCount);
}

function loadAiConfig() {
  // No-op: la config de IA se carga desde la API en loadAllUserData() al hacer login
}

function saveAiConfig() {
  API.saveAiConfig(aiConfig).catch(err => console.error('Error guardando config IA:', err));
}

/* ============================================================
   PANEL DE CONFIGURACIÓN IA
   ============================================================ */

function renderConfigPanel() {
  appState.mode = 'config';
  const app = clearApp();

  app.innerHTML = `
    <div class="fade-in config-panel">
      <h2 class="section-title">⚙️ Configuración de IA</h2>
      <p class="section-subtitle">Configura los proveedores de IA para funciones avanzadas del portal.</p>

      <div class="config-tabs">
        <button class="config-tab ${configActiveTab === 'ollama' ? 'active' : ''}" onclick="switchConfigTab('ollama')">🦙 Ollama (Local)</button>
        <button class="config-tab ${configActiveTab === 'openai' ? 'active' : ''}" onclick="switchConfigTab('openai')">🤖 OpenAI</button>
        <button class="config-tab ${configActiveTab === 'claude' ? 'active' : ''}" onclick="switchConfigTab('claude')">🧠 Claude</button>
        <button class="config-tab ${configActiveTab === 'openai_compatible' ? 'active' : ''}" onclick="switchConfigTab('openai_compatible')">🔌 Compatible OpenAI</button>
      </div>

      <div id="config-content">
        ${renderConfigTabContent()}
      </div>

      <div class="actions-row mt-xl" style="justify-content:center;">
        <button class="btn btn-secondary" onclick="renderPortal()">🏠 Volver al portal</button>
      </div>
    </div>
  `;

  if (configActiveTab === 'ollama') {
    detectOllamaModels();
  }
}

function switchConfigTab(tab) {
  configActiveTab = tab;
  renderConfigPanel();
}

function renderConfigTabContent() {
  if (configActiveTab === 'ollama') return renderOllamaConfig();
  if (configActiveTab === 'openai') return renderOpenAIConfig();
  if (configActiveTab === 'claude') return renderClaudeConfig();
  if (configActiveTab === 'openai_compatible') return renderOpenAICompatibleConfig();
  return '';
}

function renderOllamaConfig() {
  const cfg = aiConfig.ollama;
  const modelOptions = cfg.models.length > 0
    ? cfg.models.map(m => `<option value="${escapeHtml(m.name)}" ${cfg.selectedModel === m.name ? 'selected' : ''}>${escapeHtml(m.name)} ${m.size ? '(' + m.size + ')' : ''}</option>`).join('')
    : '<option value="">No se detectaron modelos</option>';

  return `
    <div class="config-section fade-in">
      <div class="config-section-title">🦙 Ollama — IA Local</div>
      <p class="config-section-desc">Conecta con Ollama ejecutándose en tu máquina local. Requiere que Ollama esté instalado y en ejecución.</p>

      <div class="config-field">
        <label class="config-label">URL de Ollama</label>
        <input type="text" class="config-input" id="ollama-url" value="${escapeHtml(cfg.url)}" placeholder="http://localhost:11434">
        <p class="config-hint">Por defecto: http://localhost:11434</p>
      </div>

      <div class="config-field">
        <label class="config-label">Modelo detectado</label>
        <select class="config-select" id="ollama-model" ${cfg.models.length === 0 ? 'disabled' : ''}>
          ${modelOptions}
        </select>
        <p class="config-hint">Los modelos se detectan automáticamente al cargar esta pestaña.</p>
      </div>

      <div id="ollama-model-list" class="model-list">
        ${cfg.models.length === 0 ? '<div class="model-empty">🔍 Detectando modelos... Asegúrate de que Ollama esté en ejecución.</div>' : ''}
      </div>

      <div class="actions-row" style="margin-top:var(--space-lg);">
        <button class="btn btn-test" onclick="testOllamaConnection()">🧪 Probar conexión</button>
        <button class="btn btn-primary" onclick="saveOllamaConfig()">💾 Guardar configuración</button>
      </div>

      <div id="ollama-test-result" class="test-result hidden"></div>
    </div>
  `;
}

function renderOpenAIConfig() {
  const cfg = aiConfig.openai;
  const maskedKey = cfg.apiKey ? 'sk-...' + cfg.apiKey.slice(-4) : '';
  return `
    <div class="config-section fade-in">
      <div class="config-section-title">🤖 OpenAI</div>
      <p class="config-section-desc">Configura tu clave de API de OpenAI para usar modelos como GPT-4o, GPT-4o-mini, etc.</p>

      <div class="config-field">
        <label class="config-label">Clave de API</label>
        <input type="password" class="config-input" id="openai-key" value="${maskedKey ? cfg.apiKey : ''}" placeholder="sk-...">
        <p class="config-hint">${maskedKey ? 'Clave guardada: ' + maskedKey : 'Introduce tu clave de API de OpenAI'}</p>
      </div>

      <div class="config-field">
        <label class="config-label">Modelo</label>
        <select class="config-select" id="openai-model">
          <option value="gpt-4o-mini" ${cfg.model === 'gpt-4o-mini' ? 'selected' : ''}>gpt-4o-mini (rápido y económico)</option>
          <option value="gpt-4o" ${cfg.model === 'gpt-4o' ? 'selected' : ''}>gpt-4o (balance calidad/precio)</option>
          <option value="gpt-4-turbo" ${cfg.model === 'gpt-4-turbo' ? 'selected' : ''}>gpt-4-turbo (máxima calidad)</option>
          <option value="gpt-3.5-turbo" ${cfg.model === 'gpt-3.5-turbo' ? 'selected' : ''}>gpt-3.5-turbo (legacy)</option>
        </select>
      </div>

      <div class="actions-row" style="margin-top:var(--space-lg);">
        <button class="btn btn-test" onclick="testOpenAIConnection()">🧪 Probar conexión</button>
        <button class="btn btn-primary" onclick="saveOpenAIConfig()">💾 Guardar configuración</button>
      </div>

      <div id="openai-test-result" class="test-result hidden"></div>
    </div>
  `;
}

function renderClaudeConfig() {
  const cfg = aiConfig.claude;
  const maskedKey = cfg.apiKey ? cfg.apiKey.slice(0, 8) + '...' + cfg.apiKey.slice(-4) : '';
  return `
    <div class="config-section fade-in">
      <div class="config-section-title">🧠 Claude (Anthropic)</div>
      <p class="config-section-desc">Configura tu clave de API de Anthropic para usar modelos Claude.</p>

      <div class="config-field">
        <label class="config-label">Clave de API</label>
        <input type="password" class="config-input" id="claude-key" value="${maskedKey ? cfg.apiKey : ''}" placeholder="sk-ant-...">
        <p class="config-hint">${maskedKey ? 'Clave guardada: ' + maskedKey : 'Introduce tu clave de API de Anthropic'}</p>
      </div>

      <div class="config-field">
        <label class="config-label">Modelo</label>
        <select class="config-select" id="claude-model">
          <option value="claude-3-haiku-20240307" ${cfg.model === 'claude-3-haiku-20240307' ? 'selected' : ''}>Claude 3 Haiku (rápido y económico)</option>
          <option value="claude-3-sonnet-20240229" ${cfg.model === 'claude-3-sonnet-20240229' ? 'selected' : ''}>Claude 3 Sonnet (balance)</option>
          <option value="claude-3-opus-20240229" ${cfg.model === 'claude-3-opus-20240229' ? 'selected' : ''}>Claude 3 Opus (máxima calidad)</option>
          <option value="claude-3-5-sonnet-20241022" ${cfg.model === 'claude-3-5-sonnet-20241022' ? 'selected' : ''}>Claude 3.5 Sonnet (último)</option>
        </select>
      </div>

      <div class="actions-row" style="margin-top:var(--space-lg);">
        <button class="btn btn-test" onclick="testClaudeConnection()">🧪 Probar conexión</button>
        <button class="btn btn-primary" onclick="saveClaudeConfig()">💾 Guardar configuración</button>
      </div>

      <div id="claude-test-result" class="test-result hidden"></div>
    </div>
  `;
}

/* ============================================================
   DETECCIÓN Y TEST DE OLLAMA
   ============================================================ */

async function detectOllamaModels() {
  const urlInput = document.getElementById('ollama-url');
  const baseUrl = urlInput ? urlInput.value.trim() : aiConfig.ollama.url;
  const listEl = document.getElementById('ollama-model-list');
  if (listEl) {
    listEl.innerHTML = '<div class="model-empty">⏳ Detectando modelos... Asegúrate de que Ollama esté en ejecución.</div>';
  }

  try {
    const res = await fetch(`${baseUrl}/api/tags`, { method: 'GET', signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const models = (data.models || []).map(m => ({
      name: m.name || m.model || 'unknown',
      size: m.size ? formatBytes(m.size) : '',
    }));
    aiConfig.ollama.models = models;
    aiConfig.ollama.selectedModel = models.length > 0 ? models[0].name : '';

    if (listEl) {
      if (models.length > 0) {
        listEl.innerHTML = models.map(m => `
          <div class="model-item">${escapeHtml(m.name)} ${m.size ? '<span style="color:var(--color-text-secondary);margin-left:auto;">' + escapeHtml(m.size) + '</span>' : ''}</div>
        `).join('');
      } else {
        listEl.innerHTML = '<div class="model-empty">⚠️ Ollama responde pero no tiene modelos instalados. Ejecuta: ollama pull llama3</div>';
      }
    }

    const select = document.getElementById('ollama-model');
    if (select) {
      select.innerHTML = models.length > 0
        ? models.map(m => `<option value="${escapeHtml(m.name)}" ${aiConfig.ollama.selectedModel === m.name ? 'selected' : ''}>${escapeHtml(m.name)} ${m.size ? '(' + m.size + ')' : ''}</option>`).join('')
        : '<option value="">No se detectaron modelos</option>';
      select.disabled = models.length === 0;
    }
  } catch (err) {
    if (listEl) {
      listEl.innerHTML = `<div class="model-empty">❌ No se pudo conectar con Ollama.<br>${escapeHtml(err.message)}<br><br>Asegúrate de que Ollama esté ejecutándose en ${escapeHtml(baseUrl)}</div>`;
    }
  }
}

async function testOllamaConnection() {
  const resultEl = document.getElementById('ollama-test-result');
  if (!resultEl) return;

  const urlInput = document.getElementById('ollama-url');
  const baseUrl = urlInput ? urlInput.value.trim() : aiConfig.ollama.url;
  const modelSelect = document.getElementById('ollama-model');
  const model = modelSelect ? modelSelect.value : aiConfig.ollama.selectedModel;

  resultEl.className = 'test-result test-loading';
  resultEl.textContent = '⏳ Probando conexión con Ollama...';

  try {
    const tagsRes = await fetch(`${baseUrl}/api/tags`, { method: 'GET', signal: AbortSignal.timeout(8000) });
    if (!tagsRes.ok) throw new Error(`Error al obtener modelos: HTTP ${tagsRes.status}`);

    if (!model) throw new Error('No hay modelo seleccionado. Detecta modelos primero.');

    const genRes = await fetch(`${baseUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, prompt: 'Say "Connection test successful" and nothing else.', stream: false }),
      signal: AbortSignal.timeout(30000),
    });
    if (!genRes.ok) throw new Error(`Error en generación: HTTP ${genRes.status}`);
    const data = await genRes.json();
    resultEl.className = 'test-result test-success';
    resultEl.innerHTML = `<strong>✅ Conexión exitosa</strong><br>
      Modelo: <code>${escapeHtml(model)}</code><br>
      Respuesta: ${escapeHtml((data.response || '').slice(0, 200))}`;
  } catch (err) {
    resultEl.className = 'test-result test-error';
    resultEl.innerHTML = `<strong>❌ Error de conexión</strong><br>${escapeHtml(err.message)}`;
  }
}

function saveOllamaConfig() {
  const urlInput = document.getElementById('ollama-url');
  const modelSelect = document.getElementById('ollama-model');
  if (urlInput) aiConfig.ollama.url = urlInput.value.trim();
  if (modelSelect) aiConfig.ollama.selectedModel = modelSelect.value;
  aiConfig.ollama.enabled = !!(aiConfig.ollama.url && aiConfig.ollama.selectedModel);
  if (aiConfig.ollama.enabled) aiConfig.selectedProvider = 'ollama';
  saveAiConfig();
  showToast('💾 Configuración de Ollama guardada');
}

/* ============================================================
   TEST Y GUARDADO DE OPENAI
   ============================================================ */

async function testOpenAIConnection() {
  const resultEl = document.getElementById('openai-test-result');
  if (!resultEl) return;

  const keyInput = document.getElementById('openai-key');
  const modelInput = document.getElementById('openai-model');
  const apiKey = keyInput ? keyInput.value.trim() : aiConfig.openai.apiKey;
  const model = modelInput ? modelInput.value : aiConfig.openai.model;

  if (!apiKey || !apiKey.startsWith('sk-')) {
    resultEl.className = 'test-result test-error';
    resultEl.innerHTML = '<strong>❌ Clave inválida</strong><br>La clave debe comenzar con "sk-"';
    return;
  }

  resultEl.className = 'test-result test-loading';
  resultEl.textContent = '⏳ Probando conexión con OpenAI...';

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: 'Say "OpenAI connection test successful" and nothing else.' }],
        max_tokens: 20,
      }),
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `HTTP ${res.status}`);
    }

    const data = await res.json();
    resultEl.className = 'test-result test-success';
    resultEl.innerHTML = `<strong>✅ Conexión exitosa</strong><br>
      Modelo: <code>${escapeHtml(model)}</code><br>
      Respuesta: ${escapeHtml((data.choices?.[0]?.message?.content || '').slice(0, 200))}`;
  } catch (err) {
    resultEl.className = 'test-result test-error';
    resultEl.innerHTML = `<strong>❌ Error de conexión</strong><br>${escapeHtml(err.message)}`;
  }
}

function saveOpenAIConfig() {
  const keyInput = document.getElementById('openai-key');
  const modelInput = document.getElementById('openai-model');
  if (keyInput) {
    const val = keyInput.value.trim();
    if (val) aiConfig.openai.apiKey = val;
  }
  if (modelInput) aiConfig.openai.model = modelInput.value;
  aiConfig.openai.enabled = !!(aiConfig.openai.apiKey && aiConfig.openai.apiKey.startsWith('sk-'));
  if (aiConfig.openai.enabled) aiConfig.selectedProvider = 'openai';
  saveAiConfig();
  showToast('💾 Configuración de OpenAI guardada');
}

/* ============================================================
   TEST Y GUARDADO DE CLAUDE
   ============================================================ */

async function testClaudeConnection() {
  const resultEl = document.getElementById('claude-test-result');
  if (!resultEl) return;

  const keyInput = document.getElementById('claude-key');
  const modelInput = document.getElementById('claude-model');
  const apiKey = keyInput ? keyInput.value.trim() : aiConfig.claude.apiKey;
  const model = modelInput ? modelInput.value : aiConfig.claude.model;

  if (!apiKey || !apiKey.startsWith('sk-ant-')) {
    resultEl.className = 'test-result test-error';
    resultEl.innerHTML = '<strong>❌ Clave inválida</strong><br>La clave debe comenzar con "sk-ant-"';
    return;
  }

  resultEl.className = 'test-result test-loading';
  resultEl.textContent = '⏳ Probando conexión con Claude...';

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        max_tokens: 20,
        messages: [{ role: 'user', content: 'Say "Claude connection test successful" and nothing else.' }],
      }),
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `HTTP ${res.status}`);
    }

    const data = await res.json();
    resultEl.className = 'test-result test-success';
    resultEl.innerHTML = `<strong>✅ Conexión exitosa</strong><br>
      Modelo: <code>${escapeHtml(model)}</code><br>
      Respuesta: ${escapeHtml((data.content?.[0]?.text || '').slice(0, 200))}`;
  } catch (err) {
    resultEl.className = 'test-result test-error';
    resultEl.innerHTML = `<strong>❌ Error de conexión</strong><br>${escapeHtml(err.message)}`;
  }
}

function saveClaudeConfig() {
  const keyInput = document.getElementById('claude-key');
  const modelInput = document.getElementById('claude-model');
  if (keyInput) {
    const val = keyInput.value.trim();
    if (val) aiConfig.claude.apiKey = val;
  }
  if (modelInput) aiConfig.claude.model = modelInput.value;
  aiConfig.claude.enabled = !!(aiConfig.claude.apiKey && aiConfig.claude.apiKey.startsWith('sk-ant-'));
  if (aiConfig.claude.enabled) aiConfig.selectedProvider = 'claude';
  saveAiConfig();
  showToast('💾 Configuración de Claude guardada');
}

/* ============================================================
   COMPATIBLE OPENAI (URL + MODELO + KEY PERSONALIZADOS)
   ============================================================ */

function renderOpenAICompatibleConfig() {
  const cfg = aiConfig.openai_compatible;
  const maskedKey = cfg.apiKey ? cfg.apiKey.slice(0, 4) + '...' + cfg.apiKey.slice(-4) : '';
  return `
    <div class="config-section fade-in">
      <h3 class="config-section-title">🔌 Compatible OpenAI</h3>
      <p class="config-description">Cualquier servicio que implemente la API de OpenAI: LM Studio, LocalAI, Groq, Together AI, Mistral, etc.</p>

      <div class="config-field">
        <label class="config-label">URL base <span class="config-hint">(sin /v1/chat/completions)</span></label>
        <input type="text" class="config-input" id="compat-url" value="${escapeHtml(cfg.url)}" placeholder="http://localhost:1234/v1">
      </div>

      <div class="config-field">
        <label class="config-label">Modelo</label>
        <input type="text" class="config-input" id="compat-model" value="${escapeHtml(cfg.model)}" placeholder="llama-3-8b-instruct / mistral-7b / ...">
      </div>

      <div class="config-field">
        <label class="config-label">API Key <span class="config-hint">(opcional si el servidor no lo requiere)</span></label>
        <input type="password" class="config-input" id="compat-key" value="${maskedKey ? cfg.apiKey : ''}" placeholder="sk-... (dejar vacío si no se necesita)">
      </div>

      <div class="config-actions">
        <button class="btn btn-secondary" onclick="testOpenAICompatibleConnection()">🔍 Probar conexión</button>
        <button class="btn btn-primary" onclick="saveOpenAICompatibleConfig()">💾 Guardar</button>
      </div>
      <div id="compat-test-result" class="test-result hidden"></div>
    </div>
  `;
}

async function testOpenAICompatibleConnection() {
  const resultEl = document.getElementById('compat-test-result');
  if (!resultEl) return;

  const url = (document.getElementById('compat-url')?.value || aiConfig.openai_compatible.url).trim().replace(/\/$/, '');
  const model = (document.getElementById('compat-model')?.value || aiConfig.openai_compatible.model).trim();
  const apiKey = (document.getElementById('compat-key')?.value || aiConfig.openai_compatible.apiKey).trim();

  if (!url) {
    resultEl.className = 'test-result test-error';
    resultEl.innerHTML = '<strong>❌ URL requerida</strong><br>Introduce la URL base del servidor.';
    return;
  }
  if (!model) {
    resultEl.className = 'test-result test-error';
    resultEl.innerHTML = '<strong>❌ Modelo requerido</strong><br>Introduce el nombre del modelo.';
    return;
  }

  resultEl.className = 'test-result test-loading';
  resultEl.textContent = '⏳ Probando conexión...';

  try {
    const headers = { 'Content-Type': 'application/json' };
    if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;

    const res = await fetch(`${url}/chat/completions`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: 'Reply with the single word: OK' }],
        max_tokens: 10,
        temperature: 0,
      }),
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `HTTP ${res.status}`);
    }

    const data = await res.json();
    resultEl.className = 'test-result test-success';
    resultEl.innerHTML = `<strong>✅ Conexión exitosa</strong><br>
      Modelo: <code>${escapeHtml(model)}</code><br>
      Respuesta: ${escapeHtml((data.choices?.[0]?.message?.content || '').slice(0, 200))}`;
  } catch (err) {
    resultEl.className = 'test-result test-error';
    resultEl.innerHTML = `<strong>❌ Error de conexión</strong><br>${escapeHtml(err.message)}`;
  }
}

function saveOpenAICompatibleConfig() {
  const urlInput = document.getElementById('compat-url');
  const modelInput = document.getElementById('compat-model');
  const keyInput = document.getElementById('compat-key');

  const url = urlInput ? urlInput.value.trim().replace(/\/$/, '') : aiConfig.openai_compatible.url;
  const model = modelInput ? modelInput.value.trim() : aiConfig.openai_compatible.model;
  const apiKey = keyInput ? keyInput.value.trim() : aiConfig.openai_compatible.apiKey;

  aiConfig.openai_compatible.url = url;
  aiConfig.openai_compatible.model = model;
  if (apiKey) aiConfig.openai_compatible.apiKey = apiKey;
  aiConfig.openai_compatible.enabled = !!(url && model);
  if (aiConfig.openai_compatible.enabled) aiConfig.selectedProvider = 'openai_compatible';
  saveAiConfig();
  showToast('💾 Configuración Compatible OpenAI guardada');
}

/* ============================================================
   UTILIDADES
   ============================================================ */

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%);
    background: var(--color-success); color: #fff; padding: 0.75rem 1.5rem;
    border-radius: var(--radius-md); font-weight: 600; z-index: 9999;
    box-shadow: var(--shadow-lg); animation: fadeIn 0.3s ease;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

/* ============================================================
   REVISIÓN DE PREGUNTAS Y RESPUESTAS (SOLO LECTURA)
   ============================================================ */

function renderReviewPanel() {
  appState.mode = 'review';
  const app = clearApp();
  const questions = getCurrentQuestions();
  const total = questions.length;

  if (total === 0) {
    app.innerHTML = `
      <div class="fade-in">
        <h2 class="section-title">🔍 Revisión de Preguntas y Respuestas</h2>
        <p class="text-center" style="color:var(--color-text-secondary)">No hay preguntas disponibles para esta certificación.</p>
        <div class="actions-row mt-xl" style="justify-content:center;">
          <button class="btn btn-secondary" onclick="renderCertificationMenu()">← Volver al menú</button>
        </div>
      </div>
    `;
    return;
  }

  const byCategory = {};
  questions.forEach(q => {
    const cat = q.category || 'Sin categoría';
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(q);
  });

  const categoryNames = Object.keys(byCategory);

  // Inicializar: todas las categorías activas (visibles)
  reviewSelectedIds = new Set(questions.map(q => q.id));
  reviewActiveCategories = new Set(categoryNames);
  window._reviewByCategory = byCategory;

  const categoryChips = categoryNames.map(cat => {
    const qs = byCategory[cat];
    return `
      <button class="category-chip selected" data-cat="${escapeHtml(cat)}" onclick="toggleCategoryFilter(this)">
        <span class="category-chip-name">${escapeHtml(cat)}</span>
        <span class="category-chip-count">${qs.length}</span>
      </button>
    `;
  }).join('');

  const categoryStats = Object.entries(byCategory).map(([cat, qs]) => `
    <div class="review-stat-card">
      <div class="review-stat-value">${qs.length}</div>
      <div class="review-stat-label">${escapeHtml(cat)}</div>
    </div>
  `).join('');

  let questionsHtml = '';
  Object.entries(byCategory).forEach(([cat, qs]) => {
    const sectionId = 'review-section-' + cat.replace(/[^a-z0-9]/gi, '_');
    questionsHtml += `
      <div id="${sectionId}" class="fade-in" style="margin-bottom:var(--space-2xl);">
        <h3 class="section-title" style="font-size:1.2rem;text-align:left;margin-bottom:var(--space-md);">📁 ${escapeHtml(cat)} <span style="color:var(--color-text-secondary);font-size:0.85rem;">(${qs.length} preguntas)</span></h3>
        <div class="review-grid">
          ${qs.map(q => renderReviewCard(q)).join('')}
        </div>
      </div>
    `;
  });

  app.innerHTML = `
    <div class="fade-in">
      <h2 class="section-title">🔍 Revisión QA</h2>
      <p class="section-subtitle">Pulsa los chips para mostrar u ocultar categorías. La revisión con IA solo procesa las categorías visibles.</p>

      <div class="card" style="margin-bottom:var(--space-xl);">
        <div style="font-weight:700;color:var(--color-text);margin-bottom:var(--space-md);font-size:0.95rem;">📂 Categorías (pulsa para filtrar):</div>
        <div class="category-chips">
          ${categoryChips}
        </div>
      </div>

      <div class="actions-row" style="justify-content:center;margin-bottom:var(--space-xl);">
        <button class="btn btn-primary" onclick="startAiReview()" id="ai-review-btn">🤖 Revisar <span id="review-selection-count">${total}</span> con IA</button>
        <button class="btn btn-secondary" onclick="renderConfigPanel()">⚙️ Configurar IA</button>
      </div>

      <div id="ai-review-result" class="hidden"></div>

      <div class="review-stats-bar">
        <div class="review-stat-card">
          <div class="review-stat-value">${total}</div>
          <div class="review-stat-label">Total preguntas</div>
        </div>
        <div class="review-stat-card">
          <div class="review-stat-value">${Object.keys(byCategory).length}</div>
          <div class="review-stat-label">Categorías</div>
        </div>
        ${categoryStats}
      </div>

      ${questionsHtml}

      <div class="actions-row mt-xl" style="justify-content:center;">
        <button class="btn btn-secondary" onclick="renderCertificationMenu()">← Volver al menú</button>
      </div>
    </div>
  `;
}

function renderReviewCard(q) {
  const correctIdx = q.correctAnswer;
  const isChecked = reviewSelectedIds.has(q.id) ? 'checked' : '';
  return `
    <div class="review-card" id="review-q-${q.id}">
      <div class="review-card-header">
        <label class="review-checkbox-label">
          <input type="checkbox" class="review-checkbox" data-qid="${q.id}" ${isChecked} onchange="toggleReviewSelection(${q.id})">
          <span class="review-checkbox-text">Seleccionar</span>
        </label>
        <span class="review-card-category">${escapeHtml(q.category || 'General')}</span>
        <span class="review-card-difficulty ${getDifficultyClass(q.difficulty || q.level)}">${escapeHtml(q.difficulty || q.level || 'medio')}</span>
        <span class="review-card-id">#${q.id}</span>
      </div>
      <div class="review-question">${escapeHtml(q.question)}</div>
      <div class="review-options">
        ${q.options.map((opt, idx) => `
          <div class="review-option ${idx === correctIdx ? 'correct' : 'incorrect'}">
            <span class="review-option-letter">${String.fromCharCode(65 + idx)}</span>
            <span>${escapeHtml(opt)}</span>
            ${idx === correctIdx ? '<span style="margin-left:auto;color:var(--color-success);font-weight:700;">✓ Correcta</span>' : ''}
          </div>
        `).join('')}
      </div>
      <div class="review-explanation">
        <strong>Explicación:</strong> ${escapeHtml(q.explanation)}
        ${q.command ? `<div style="margin-top:var(--space-sm);font-family:monospace;background:var(--color-surface);padding:var(--space-sm);border-radius:var(--radius-sm);"><strong>Comando:</strong> <code>${escapeHtml(q.command)}</code></div>` : ''}
      </div>
      <div class="ai-verdict hidden" id="ai-verdict-${q.id}"></div>
    </div>
  `;
}

/* ============================================================
   REVISIÓN CON IA — LÓGICA COMPLETA
   ============================================================ */

function getActiveProviderName() {
  const p = getActiveProvider();
  if (p === 'ollama') return 'Ollama';
  if (p === 'openai') return 'OpenAI';
  if (p === 'claude') return 'Claude';
  if (p === 'openai_compatible') return aiConfig.openai_compatible.model || 'Compatible OpenAI';
  return 'sin configurar';
}

function getActiveProvider() {
  const sel = aiConfig.selectedProvider;
  if (sel === 'ollama' && aiConfig.ollama.enabled) return 'ollama';
  if (sel === 'openai' && aiConfig.openai.enabled) return 'openai';
  if (sel === 'claude' && aiConfig.claude.enabled) return 'claude';
  if (sel === 'openai_compatible' && aiConfig.openai_compatible?.enabled) return 'openai_compatible';
  // fallback: first enabled
  if (aiConfig.ollama.enabled) return 'ollama';
  if (aiConfig.openai.enabled) return 'openai';
  if (aiConfig.claude.enabled) return 'claude';
  if (aiConfig.openai_compatible?.enabled) return 'openai_compatible';
  return null;
}

async function startAiReview() {
  const provider = getActiveProvider();
  if (!provider) {
    alert('No hay ningún proveedor de IA configurado. Ve a ⚙️ Configurar IA y configura al menos uno.');
    return;
  }

  const allQuestions = getCurrentQuestions();
  const selectedQuestions = allQuestions.filter(q => {
    const cat = q.category || 'Sin categoría';
    return reviewActiveCategories.has(cat);
  });

  if (selectedQuestions.length === 0) {
    alert('No hay preguntas visibles. Activa al menos una categoría con los chips.');
    return;
  }

  const BATCH_SIZE = 15;
  const btn = document.getElementById('ai-review-btn');
  const resultContainer = document.getElementById('ai-review-result');

  if (btn) { btn.disabled = true; }
  if (resultContainer) {
    resultContainer.classList.remove('hidden');
    resultContainer.innerHTML = `<div class="test-result test-loading">🤖 Preparando revisión de ${selectedQuestions.length} preguntas en lotes de ${BATCH_SIZE}...</div>`;
  }

  try {
    const batches = [];
    for (let i = 0; i < selectedQuestions.length; i += BATCH_SIZE) {
      batches.push(selectedQuestions.slice(i, i + BATCH_SIZE));
    }

    let allVerdicts = [];
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      if (btn) btn.textContent = `⏳ Lote ${i + 1}/${batches.length} (${batch.length} preguntas)...`;
      if (resultContainer) {
        resultContainer.innerHTML = `<div class="test-result test-loading">🤖 Revisando lote ${i + 1} de ${batches.length} (${batch.length} preguntas)...</div>`;
      }
      const prompt = buildReviewPrompt(batch);
      const response = await callAiProvider(provider, prompt);
      const verdicts = parseAiReviewResponse(response, batch);
      allVerdicts = [...allVerdicts, ...verdicts];
    }

    renderAiReviewResult(allVerdicts, selectedQuestions);
  } catch (err) {
    if (resultContainer) {
      resultContainer.innerHTML = `<div class="test-result test-error"><strong>❌ Error en la revisión</strong><br>${escapeHtml(err.message)}</div>`;
    }
  } finally {
    if (btn) {
      btn.disabled = false;
      const visibleCount = [...reviewActiveCategories].reduce((sum, cat) => sum + (window._reviewByCategory?.[cat]?.length || 0), 0);
      btn.textContent = `🤖 Revisar ${visibleCount} con IA`;
    }
  }
}

function buildReviewPrompt(questions) {
  const certName = studyState.cert ? studyState.cert.name : 'Certificación';
  let text = `Eres un experto en certificaciones técnicas. Revisa las siguientes preguntas de tipo test para el examen "${certName}".

Para CADA pregunta, indica:
1. Si la respuesta correcta marcada es realmente correcta (SÍ / NO)
2. Si es NO, indica cuál debería ser la respuesta correcta (letra A, B, C o D)
3. Una breve explicación de por qué es correcta o incorrecta (máximo 2 líneas)

Responde EXACTAMENTE en este formato JSON (array de objetos):
[
  { "id": 1, "correct": true, "explanation": "..." },
  { "id": 2, "correct": false, "correctedAnswer": "C", "explanation": "..." }
]

PREGUNTAS A REVISAR:

`;

  questions.forEach(q => {
    text += `--- Pregunta #${q.id} ---\n`;
    text += `Categoría: ${q.category || 'General'} | Dificultad: ${q.difficulty || q.level || 'medio'}\n`;
    text += `Pregunta: ${q.question}\n`;
    q.options.forEach((opt, idx) => {
      const marker = idx === q.correctAnswer ? ' [RESPUESTA CORRECTA SEGÚN EL AUTOR]' : '';
      text += `  ${String.fromCharCode(65 + idx)}. ${opt}${marker}\n`;
    });
    text += `Explicación del autor: ${q.explanation}\n\n`;
  });

  text += `\nResponde SOLO el JSON, sin texto adicional antes o después.`;
  return text;
}

async function callAiProvider(provider, prompt) {
  if (provider === 'ollama') {
    const res = await fetch(`${aiConfig.ollama.url}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: aiConfig.ollama.selectedModel,
        prompt,
        stream: false,
        options: { temperature: 0.1 },
      }),
      signal: AbortSignal.timeout(120000),
    });
    if (!res.ok) throw new Error(`Ollama HTTP ${res.status}`);
    const data = await res.json();
    return data.response || '';
  }

  if (provider === 'openai') {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${aiConfig.openai.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: aiConfig.openai.model,
        messages: [
          { role: 'system', content: 'Eres un experto en certificaciones técnicas. Responde solo con JSON válido.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.1,
        max_tokens: 4000,
      }),
      signal: AbortSignal.timeout(120000),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `OpenAI HTTP ${res.status}`);
    }
    const data = await res.json();
    return data.choices?.[0]?.message?.content || '';
  }

  if (provider === 'claude') {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': aiConfig.claude.apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: aiConfig.claude.model,
        max_tokens: 4000,
        system: 'Eres un experto en certificaciones técnicas. Responde solo con JSON válido.',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.1,
      }),
      signal: AbortSignal.timeout(120000),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `Claude HTTP ${res.status}`);
    }
    const data = await res.json();
    return data.content?.[0]?.text || '';
  }

  if (provider === 'openai_compatible') {
    const cfg = aiConfig.openai_compatible;
    const url = cfg.url.replace(/\/$/, '');
    const headers = { 'Content-Type': 'application/json' };
    if (cfg.apiKey) headers['Authorization'] = `Bearer ${cfg.apiKey}`;
    const res = await fetch(`${url}/chat/completions`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: cfg.model,
        messages: [
          { role: 'system', content: 'Eres un experto en certificaciones técnicas. Responde solo con JSON válido.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.1,
        max_tokens: 4000,
      }),
      signal: AbortSignal.timeout(120000),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `Compatible OpenAI HTTP ${res.status}`);
    }
    const data = await res.json();
    return data.choices?.[0]?.message?.content || '';
  }


  throw new Error('Proveedor de IA no soportado');
}

function parseAiReviewResponse(response, questions) {
  // Extraer JSON del texto de respuesta
  let jsonText = response;

  // Buscar bloque JSON entre corchetes
  const match = response.match(/\[[\s\S]*\]/);
  if (match) jsonText = match[0];

  // Limpiar posibles comillas tipográficas o caracteres extraños
  jsonText = jsonText.replace(/[\u201C\u201D]/g, '"').replace(/[\u2018\u2019]/g, "'");

  let verdicts;
  try {
    verdicts = JSON.parse(jsonText);
  } catch {
    // Fallback: intentar extraer línea por línea
    throw new Error('La IA no devolvió un JSON válido. Respuesta: ' + response.slice(0, 500));
  }

  if (!Array.isArray(verdicts)) {
    throw new Error('La respuesta no es un array JSON');
  }

  // Normalizar y validar cada veredicto
  return verdicts.map(v => {
    const q = questions.find(qItem => qItem.id === v.id);
    return {
      id: v.id,
      correct: !!v.correct,
      correctedAnswer: v.correctedAnswer || null,
      explanation: v.explanation || 'Sin explicación',
      question: q ? q.question : 'Pregunta desconocida',
    };
  });
}

function renderAiReviewResult(verdicts, questions) {
  const resultContainer = document.getElementById('ai-review-result');
  if (!resultContainer) return;

  const total = verdicts.length;
  const correctCount = verdicts.filter(v => v.correct).length;
  const incorrectCount = total - correctCount;

  let html = `
    <div class="card" style="margin-bottom:var(--space-xl);">
      <h3 style="font-size:1.2rem;font-weight:700;margin-bottom:var(--space-md);">📊 Resultado de la revisión por IA</h3>
      <div class="review-stats-bar" style="margin-bottom:0;">
        <div class="review-stat-card">
          <div class="review-stat-value" style="color:var(--color-success)">${correctCount}</div>
          <div class="review-stat-label">Correctas según IA</div>
        </div>
        <div class="review-stat-card">
          <div class="review-stat-value" style="color:var(--color-error)">${incorrectCount}</div>
          <div class="review-stat-label">Con posibles errores</div>
        </div>
        <div class="review-stat-card">
          <div class="review-stat-value">${Math.round((correctCount / total) * 100)}%</div>
          <div class="review-stat-label">Fiabilidad</div>
        </div>
      </div>
    </div>
  `;

  if (incorrectCount > 0) {
    html += `<h3 style="font-size:1.1rem;font-weight:700;margin-bottom:var(--space-md);color:var(--color-error);">⚠️ Preguntas con posibles errores (${incorrectCount})</h3>`;
    verdicts.filter(v => !v.correct).forEach(v => {
      html += `
        <div class="review-card" style="border-left:4px solid var(--color-error);">
          <div class="review-card-header">
            <span class="review-card-category">#${v.id}</span>
            <span style="margin-left:auto;color:var(--color-error);font-weight:700;">❌ Posible error</span>
          </div>
          <div class="review-question">${escapeHtml(v.question)}</div>
          ${v.correctedAnswer ? `<div style="padding:var(--space-sm);background:var(--color-success-bg);border-radius:var(--radius-sm);margin-bottom:var(--space-sm);">
            <strong>Respuesta según IA:</strong> Opción ${escapeHtml(v.correctedAnswer)}
          </div>` : ''}
          <div class="review-explanation" style="background:var(--color-error-bg);border-left-color:var(--color-error);">
            <strong>Explicación de la IA:</strong> ${escapeHtml(v.explanation)}
          </div>
        </div>
      `;
    });
  } else {
    html += `<div class="test-result test-success" style="margin-bottom:var(--space-xl);">
      <strong>✅ La IA no detectó errores</strong><br>
      Todas las preguntas parecen correctas según el análisis del modelo ${escapeHtml(getActiveProviderName())}.
    </div>`;
  }

  resultContainer.innerHTML = html;
  resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
