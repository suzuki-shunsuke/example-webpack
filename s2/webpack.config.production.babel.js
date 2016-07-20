import glob from 'glob';
import path from 'path';
import webpack from 'webpack';

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin('style.css');
const extractSCSS = new ExtractTextPlugin('style-scss.css');

const js_entry = {};
glob.sync(path.join(__dirname, 'src/**/main.js')).forEach(e => {
  js_entry[e.slice(path.join(__dirname, 'src/').length, - ('.js'.length))] = e;
});

const css_entry = glob.sync(path.join(__dirname, 'src/**/*.css'));
const scss_entry = glob.sync(path.join(__dirname, 'src/**/*.scss'));

module.exports = [{
  entry: js_entry,
  externals: {
  },
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    root: [path.join(__dirname, 'src'),],
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }],
  },
}, {
  entry: css_entry,
  externals: {
  },
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    root: [path.join(__dirname, 'src'),],
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    extractCSS
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'style.css',
  },
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
}, {
  entry: scss_entry,
  externals: {
  },
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    root: [path.join(__dirname, 'src'),],
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    extractSCSS
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'style-scss.css',
  },
  module: {
    loaders: [{
      test: /\.scss/,
      exclude: /node_modules/,
      loader: extractSCSS.extract(['css', 'sass'])
    }, {
      test: /\.svg$/,
      loader: 'svg-url-loader'
    }],
  },
}];
