const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  output: {
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new WebpackPwaManifest({
      name: 'Mental Cycle',
      short_name: 'Cycle',
      description: 'Track your mind',
      background_color: '#3d4fbc',
      theme_color: '#3d4fbc',
      ios: {
        'apple-mobile-web-app-status-bar-style': 'black',
      },
      icons: [
        {
          src: 'assets/icon.png',
          sizes: [120, 152, 167, 180, 1024],
          ios: true,
        },
        {
          src: 'assets/icon.png',
          sizes: [36, 48, 72, 96, 144, 192, 512],
        },
      ],
    }),
    new WorkboxPlugin.GenerateSW(),
    new CopyPlugin([
      { from: 'public/_redirects', to: '' },
    ]),
  ],
};
