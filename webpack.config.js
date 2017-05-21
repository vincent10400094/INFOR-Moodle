"use strict";

const debug = process.env.NODE_ENV !== "production";

const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: debug ? 'inline-sourcemap' : null,
  entry: path.join(__dirname, 'app', 'app-client.js'),
  devServer: {
    inline: true,
    port: 3333,
    contentBase: "public/",
    historyApiFallback: {
      index: '/index-static.html'
    }
  },
  output: {
    path: path.join(__dirname, 'public', 'js'),
    publicPath: "/js/",
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: path.join(__dirname),
      loader: ['babel-loader'],
      query: {
        cacheDirectory: 'babel_cache',
        presets: debug ? ['react', 'es2015', 'react-hmre'] : ['react', 'es2015']
      }
    }]
  },
  plugins: debug ? [] : [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: { warnings: false },
    //   mangle: true,
    //   sourcemap: false,
    //   beautify: false,
    //   dead_code: true
    // }),
  ]
};
