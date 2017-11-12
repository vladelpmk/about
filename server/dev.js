const express = require('express');
const compress = require('compression');
const webpack = require('webpack');
const path = require('path');

//configuration files
const project = require('../config/project.config');
const webpackConfig = require('../config/webpack.config');

//compiler
const compile = require('../bin/compile')();

//start server
const app = express();
app.use(compress());

const compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath  : webpackConfig.output.publicPath,
  contentBase : path.resolve(project.dirBase, project.dirSource),
  hot         : true,
  quiet       : false,
  noInfo      : false,
  lazy        : false,
  stats       : 'minimal'
}));

app.use(require('webpack-hot-middleware')(compiler, {
  path: '/__webpack_hmr'
}));

module.exports = app;
