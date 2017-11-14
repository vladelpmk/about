const server = require('../server');
const debug = require('debug')('app:server');

//compiler
const compile = require('../bin/compile');

compile().then(() => {
  server.listen(process.env.PORT || 3000);
  debug(`Server is now running at http://localhost:${process.env.PORT || 3000}.`);
})
