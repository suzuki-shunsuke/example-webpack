import glob from 'glob';
import path from 'path';
import webpack from 'webpack';

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin('[name].css');

const js_entry = {};
glob.sync('./src/**/main.js').forEach(e => {
  js_entry[e.slice('./src/'.length, - ('.js'.length))] = e;
});

const css_entry = {};
glob.sync('./src/**/main.css').forEach(e => {
  css_entry[e.slice('./src/'.length, - ('.css'.length))] = e;
});

module.exports = [{
  entry: js_entry,
  externals: {
  },
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    root: [path.resolve('./src'),],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
  },
  plugins: [],
  module: {
    loaders: [],
  },
  devtool: '#inline-source-map',
  devServer: {
    hot: true,
    host: '0.0.0.0',
    contentBase: 'build',
    publicPath: '/static/',
    host: '0.0.0.0',
    port: 3500,
  },
}, {
  entry: css_entry,
  externals: {
  },
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    root: [path.resolve('./src'),],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].css',
  },
  plugins: [
    extractCSS
  ],
  module: {
    loaders: [{
      test: /\.css/,
      exclude: /node_modules/,
      loader: extractCSS.extract(['css'])
    }, {
      test: /\.svg$/,
      loader: 'svg-url-loader'
    }],
  },
  devtool: '#inline-source-map',
  devServer: {
    hot: true,
    host: '0.0.0.0',
    contentBase: 'build',
    publicPath: '/static/',
    host: '0.0.0.0',
    port: 3500,
  },
}];
