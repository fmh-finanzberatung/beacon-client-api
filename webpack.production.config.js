const webpackBase = require('./webpack.config.js');
const { merge } = require('webpack-merge');

module.exports = merge(webpackBase, {
  mode: 'production',
  target: 'web',
});
