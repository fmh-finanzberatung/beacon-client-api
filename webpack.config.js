const Path = require('path');

module.exports = {
  target: 'web',
  entry: './src/index.js',
  experiments: {
    outputModule: true,
  },
  output: {
    path: Path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'module',
    publicPath: '/' 
    },
};
