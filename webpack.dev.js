const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: 'dist',
    port: 8080,
    historyApiFallback: true,
  },

  // This is the same as "stats: 'minimal'" but when you do that terminal colors
  // are disabled
  stats: {
    all: false,
    modules: true,
    maxModules: 0,
    errors: true,
    warnings: true,
    logging: 'warn',
  },
});
