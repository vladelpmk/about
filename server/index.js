const webpack = require('webpack');
const express = require('express');
const webpackConfig = require('../config/webpack.config');

const compiler = webpack(webpackConfig);
compiler.run((err, stats) => {
  console.log(stats);
});

var app = express();

app.use(express.static('dist/'));

module.exports = app;
