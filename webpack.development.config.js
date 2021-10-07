const Path = require('path');
const webpackBase = require('./webpack.config.js');
const { merge } = require('webpack-merge');

module.exports = merge(webpackBase, {
  mode: 'development',
  target: 'web',
  devServer: {
    static: {
      directory: Path.join(__dirname, 'dev/public'),
    },
    magicHtml: true,
    compress: true,
    port: 9000,
  },
});
