var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  cache: true,

  debug: true,

  devtool: 'eval-inline',

  plugins: [
    new HtmlWebpackPlugin()
  ],

  module: {
    preLoaders: [
      {
        test: /\.js/,
        exclude: /(node_modules)/,
        loaders: [
          'jshint',
          'jscs'
        ]
      }
    ],
    loaders: [
      {
        test: /\.js/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          stage: 2
        }
      }
    ]
  },

  devServer: {
    inline: true,
    quiet: false,
    hot: true
  }
};
