const { merge } = require('webpack-merge');
const baseConfig = require('./base.config.js');

module.exports = merge({
  apiHost: 'https://beacon.fmh.de'
}, baseConfig);

