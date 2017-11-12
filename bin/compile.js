const debug = require('debug')('app:comiler');
const webpack = require('webpack');
const fs = require('fs-extra');

// compiler configuration files
const webpackConfig = require('../config/webpack.config');
const project = require('../config/project.config');

const webpackCompiler = (webpackConfig) =>
  new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig);
    compiler.run((err, stats) => {
      if (err) {
        debug('Webpack compiler encountered a fatal error.', err);
        return reject(err);
      }

      const jsonStats = stats.toJson();
      debug('Webpack compile completed.');
      debug(stats.toString(project.compiler.compilerStats));

      if (jsonStats.errors.length > 0) {
        debug('Webpack compiler encountered errors.');
        debug(jsonStats.errors.join('\n'));
        return reject(new Error('Webpack compiler encountered errors'));
      }

      if (jsonStats.warnings.length > 0) {
        debug('Webpack compiler encountered warnings.');
        debug(jsonStats.warnings.join('\n'));
        return resolve(jsonStats);
      }

      debug('No errors or warnings encountered.');
      resolve(jsonStats);
    });
  });

const compile = () => {
  debug('Starting compiler.');
  return Promise.resolve()
    .then(() => webpackCompiler(webpackConfig))
    .then(stats => {
      if (stats.warnings.length && project.compiler.failOnWarning) {
        throw new Error('Config set to fail on warning, exiting with status code "1".');
      }
      debug('Copying static assets to dist folder.');
      fs.copySync(project.dirStatic, project.dirDist);
    })
    .then(() => {
      debug('Compilation completed successfully.');
    })
    .catch((err) => {
      debug('Compiler encountered an error.', err);
      process.exit(1);
    });
};

module.exports = compile;
