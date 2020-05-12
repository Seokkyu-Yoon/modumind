const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackBase = require('./webpack.config');

const mode = 'production';
const webpackProduction = {
  ...webpackBase,
  mode,
  plugins: [
    new CleanWebpackPlugin(),
    ...webpackBase.plugins,
  ],
};

module.exports = webpackProduction;
