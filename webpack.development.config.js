const Path = require('path');
const webpackBase = require('./webpack.config.js');
const merge = require('webpack-merge');

module.exports = merge(webpackBase, {
  mode: 'development',
  target: 'web',
  devServer: {
    static: {
      directory: Paht.join(__dirname, 'dev/public'),
    },
    compress: true,
    port: 9000,

  },
});
