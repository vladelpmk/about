const express = require('express');
const debug = require('debug')('app:server');

//configuration files
const project = require('../config/project.config');

//compiler
const compile = require('../bin/compile')();

//start server
var app = express();
app.use(express.static(project.dirDist));

module.exports = app;
