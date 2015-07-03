var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  cache: true,

  debug: true,

  devtool: 'eval',

  entry: [
    './lib/Cypher.js',
    './lib/Caesar.js',
    './lib/SimpleSubstitution.js',
  ],

  output: {
    path: './dist',
    filename: '[name].[hash].js'
  },

  plugins: [
    new HtmlWebpackPlugin()
  ],

  module: {
    preLoaders: [
      {
        test: /\.js/,
        exclude: /(node_modules|bower_components)/,
        loaders: [
          'jshint',
          'jscs'
        ]
      }
    ],
    loaders: [
      {
        test: /\.js/,
        exclude: /(node_modules|bower_components)/,
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
    // hot: true
  }
};
