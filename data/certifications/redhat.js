module.exports = {
  redhat: {
    id: 'redhat',
    name: 'Red Hat',
    icon: '🔴',
    certifications: {
      ...require('./redhat/ex200'),
      ...require('./redhat/ex294'),
      ...require('./redhat/ex374'),
    }
  }
};
