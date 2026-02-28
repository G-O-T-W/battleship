// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    // Handling HTML
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  module: {
    rules: [
      {
        // Loading CSS
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        // Image files we reference in our HTML template
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        // Images we use in our JavaScript, where we will need to import the files
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
