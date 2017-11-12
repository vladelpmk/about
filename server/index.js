const express = require('express');

//configuration files
const project = require('../config/project.config');

//compiler
const compile = require('../bin/compile')();

//start server
var app = express();
app.use(express.static(project.dirDist));

module.exports = app;
