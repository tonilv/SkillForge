// api.js - Cliente HTTP para CertPrep
// Proporciona el objeto API usado por script.js y ai-config.js

let currentUser = null;
let onAuthError = null;

function getToken() {
  return localStorage.getItem('certprep_token');
}

function setToken(token) {
  localStorage.setItem('certprep_token', token);
}

function clearToken() {
  localStorage.removeItem('certprep_token');
}

async function apiReq(method, path, body) {
  const headers = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`/api${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();

  if (res.status === 401) {
    clearToken();
    currentUser = null;
    if (onAuthError) onAuthError();
    throw new Error('Unauthorized');
  }

  return data;
}

const API = {
  register: (email, password, displayName) =>
    apiReq('POST', '/auth/register', { email, password, displayName }),

  login: (email, password) =>
    apiReq('POST', '/auth/login', { email, password }),

  me: () => apiReq('GET', '/auth/me'),

  getProgress: (certKey) => apiReq('GET', `/data/progress/${certKey}`),
  saveProgress: (certKey, data) => apiReq('POST', `/data/progress/${certKey}`, data),
  clearProgress: (certKey) => apiReq('DELETE', `/data/progress/${certKey}`),

  getEnhanced: () => apiReq('GET', '/data/enhanced'),
  saveNotes: (notes) => apiReq('POST', '/data/notes', { notes }),
  saveSRS: (srsData) => apiReq('POST', '/data/srs', { srsData }),
  saveHistory: (history) => apiReq('POST', '/data/history', { history }),
  saveAchievements: (achievements, maxStreak) =>
    apiReq('POST', '/data/achievements', { achievements, maxStreak }),

  getTheme: () => apiReq('GET', '/data/theme'),
  saveTheme: (theme) => apiReq('POST', '/data/theme', { theme }),

  getAiConfig: () => apiReq('GET', '/data/aiconfig'),
  saveAiConfig: (config) => apiReq('POST', '/data/aiconfig', { config }),
};
