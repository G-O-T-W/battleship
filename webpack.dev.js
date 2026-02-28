const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  // Webpack dev server
  devtool: 'eval-source-map',
  devServer: {
    watchFiles: ['src/index.html'],
  },
});
