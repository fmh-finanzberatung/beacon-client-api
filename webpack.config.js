const Path = require('path');
const env = process.env.NODE_ENV;
const webpack = require('webpack');
const envConfig = require(`./config/env/${env}.config.js`); 

module.exports = {
  target: 'web',
  entry: './src/index.js',
  experiments: {
    outputModule: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${(env || 'development')}"`,
        API_HOST: `"${(envConfig.apiHost)}"`,
        ACCESS_LOG_URI: `"${(envConfig.apiAccessLogUri)}"`,
        ERROR_LOG_URI: `"${(envConfig.apiErrorLogUri)}"`,
      }
    }),
  ],
  output: {
    path: Path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'module',
    publicPath: '/' 
    },
};
