module.exports = {
  microsoft: {
    id: 'microsoft',
    name: 'Microsoft',
    icon: '🔷',
    certifications: {
      ...require('./microsoft/ai900'),
      ...require('./microsoft/pl900'),
      ...require('./microsoft/pl300'),
    }
  }
};
