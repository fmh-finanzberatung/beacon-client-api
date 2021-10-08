const { merge } = require('webpack-merge');
const baseConfig = require('./base.config.js');

module.exports = merge({
  logLevel: 'info',
  apiHost: 'http://localhost:3006'
}, baseConfig);
