const path = require('path');
const project = require('./project.config');
//webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const inProject = path.resolve.bind(path, project.dirBase);
const inProjectSrc = (file) => inProject( project.dirSource, file);

const extractSass = new ExtractTextPlugin({
  filename: 'style.[contenthash].css',
  allChunks: true
});

var config = {
  entry: inProjectSrc('index.js'),
  output: {
    path: inProject(project.dirDist),
    filename: "script.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }]
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: inProjectSrc('index.html'),
      filename: 'index.html'
    }),
    extractSass
  ]
}

module.exports = config;
