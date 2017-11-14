const express = require('express');
const compress = require('compression');
const path = require('path');

//configuration files
const project = require('../config/project.config');
const webpackConfig = require('../config/webpack.config');

//start server
const server = (compiler) => {
  const app = express();
  app.use(compress());

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath  : webpackConfig.output.publicPath,
    contentBase : path.resolve(project.dirBase, project.dirSource),
    hot         : true,
    quiet       : false,
    noInfo      : false,
    lazy        : false,
    stats       :  project.compiler.compilerStats
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    path: '/__webpack_hmr'
  }));

  return app;
}

module.exports = server;
