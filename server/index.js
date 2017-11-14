const express = require('express');

//configuration files
const project = require('../config/project.config');

//start server
var app = express();
app.use(express.static(project.dirDist));

module.exports = app;
