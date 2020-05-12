const path = require('path');
const webpack = require('webpack');
const webpackBase = require('./webpack.config');

const workspace = path.resolve();
const pathBuild = path.join(workspace, 'build');

const mode = 'development';
const devtool = 'inline-source-map';
const devServer = {
  contentBase: pathBuild,
  overlay: true,
  hot: true,
  before(app, server, compiler) {
    const watchFiles = ['.html'];

    compiler.plugin('done', () => {
      const changedFiles = Object.keys(compiler.watchFileSystem.watcher.mtimes);

      if (
        this.hot
        && changedFiles.some((filePath) => watchFiles.includes(path.parse(filePath).ext))
      ) {
        server.sockWrite(server.sockets, 'content-changed');
      }
    });
  },
};

const webpackDevelopment = {
  ...webpackBase,
  mode,
  devtool,
  devServer,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    ...webpackBase.plugins,
  ],
};

module.exports = webpackDevelopment;
