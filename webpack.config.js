const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const runningDir = process.cwd();

module.exports = {
  mode: 'development',
  entry: path.join(runningDir, 'src/index.js'),

  output: {
    publicPath: '/',
    path: path.join(runningDir, 'build'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(runningDir, 'src/index.html'),
      favicon: path.join(runningDir, 'src/favicon.ico'),
      inject: true,
    }),
    new webpack.ProvidePlugin({
      'THREE': 'three'
    }),
  ],

  devtool: 'eval-source-map',

  target: 'web',
}