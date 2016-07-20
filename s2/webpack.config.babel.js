import glob from 'glob';
import path from 'path';
import webpack from 'webpack';

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin('style.css');

const js_entry = {};
glob.sync(path.join(__dirname, 'src/**/main.js')).forEach(e => {
  js_entry[e.slice(path.join(__dirname, 'src/').length, - ('.js'.length))] = e;
});

const css_entry = glob.sync(path.join(__dirname, 'src/**/*.css'));

module.exports = [{
  entry: js_entry,
  externals: {
  },
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    root: [path.join(__dirname, 'src'),],
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
    root: [path.join(__dirname, 'src'),],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'style.css',
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
