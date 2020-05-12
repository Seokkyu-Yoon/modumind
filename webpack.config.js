const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const workspace = path.resolve();
const pathSrc = path.join(workspace, 'src');
const pathAssets = path.join(workspace, 'assets');
const pathBuild = path.join(workspace, 'build');

module.exports = {
  mode: 'none',
  entry: {
    index: ['@babel/polyfill', path.join(pathSrc, 'js', 'index.js')],
  },
  output: {
    filename: '[name].js',
    path: pathBuild,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options:{
              name: '[name].[ext]',
              outputPath: 'fonts/'
            },
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        loader: 'file-loader',
      }, 
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(workspace, 'index.html'),
      chunks: ['index'],
      favicon: path.join(pathAssets, 'favicon.ico')
    }),
    new CopyWebpackPlugin([
      {from: 'assets/image', to: 'image'},
      {from: 'assets/json', to: 'json'},
      // {from: 'src/style', to: 'style'},
    ])
  ],
};
