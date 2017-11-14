const debug = require('debug')('app:server');
const webpack =  require('webpack');

//configuration
const webpackConfig = require('../config/webpack.config');

const server = require('../server/dev')(webpack(webpackConfig));
server.listen(process.env.PORT || 3000);
debug(`Server is now running at http://localhost:${process.env.PORT || 3000}.`);
