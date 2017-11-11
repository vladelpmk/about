const path = require('path');
const project = require('./project.config');
//webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

const inProject = path.resolve.bind(path, project.dirBase);
const inProjectSrc = (file) => inProject( project.dirSource, file);

var config = {
  entry: inProjectSrc('index.js'),
  output: {
    path: inProject(project.dirDist),
    filename: "bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: inProjectSrc('index.html'),
      filename: 'index.html'
    })
  ]
}

module.exports = config;
