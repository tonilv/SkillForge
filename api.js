// api.js - Cliente HTTP para SkillForge

let currentUser = null;
let onAuthError = null;

function getToken() {
  return localStorage.getItem('skillforge_token');
}

function setToken(token) {
  localStorage.setItem('skillforge_token', token);
}

function clearToken() {
  localStorage.removeItem('skillforge_token');
}

function getTrustedDeviceToken() {
  return localStorage.getItem('skillforge_trusted_device');
}

function setTrustedDeviceToken(token) {
  localStorage.setItem('skillforge_trusted_device', token);
}

function clearTrustedDeviceToken() {
  localStorage.removeItem('skillforge_trusted_device');
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

async function preAuthReq(method, path, preToken, body) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${preToken}`,
  };

  const res = await fetch(`/api${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  return res.json();
}

const API = {
  register: (email, password, displayName) =>
    apiReq('POST', '/auth/register', { email, password, displayName }),

  login: (email, password) =>
    apiReq('POST', '/auth/login', { email, password, trustedDevice: getTrustedDeviceToken() }),

  me: () => apiReq('GET', '/auth/me'),

  get2FASetup: (preToken) => preAuthReq('GET', '/auth/2fa/setup', preToken),
  enable2FA: (code, preToken) => preAuthReq('POST', '/auth/2fa/enable', preToken, { code }),
  verify2FA: (code, preToken) => preAuthReq('POST', '/auth/2fa/verify', preToken, { code }),
  changePassword: (newPassword) => apiReq('POST', '/auth/change-password', { newPassword }),

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

  getContent: () => apiReq('GET', '/content'),

  // Admin
  getUsers: () => apiReq('GET', '/admin/users'),
  createUser: (data) => apiReq('POST', '/admin/users', data),
  updateUser: (id, data) => apiReq('PATCH', `/admin/users/${id}`, data),
  deleteUser: (id) => apiReq('DELETE', `/admin/users/${id}`),
  resetUser2FA: (id) => apiReq('POST', `/admin/users/${id}/reset-2fa`),
  saveAnnouncement: (text, enabled) => apiReq('PUT', '/admin/announcement', { text, enabled }),
  sendAnnouncement: () => apiReq('POST', '/admin/announcement/send'),

  // Public
  getAnnouncement: () => fetch('/api/announcement').then(r => r.json()),

  saveTrustedDevice: setTrustedDeviceToken,
  clearTrustedDevice: clearTrustedDeviceToken,

  getStudyMaterials: (certKey) => apiReq('GET', `/data/study/${certKey}`),
  addStudyMaterial: (certKey, data) => apiReq('POST', `/data/study/${certKey}`, data),
  deleteStudyMaterial: (certKey, id) => apiReq('DELETE', `/data/study/${certKey}/${id}`),
};
