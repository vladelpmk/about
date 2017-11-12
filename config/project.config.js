const path = require('path');

const config = {
  dirBase :      path.resolve(__dirname, '..'),
  dirSource :    'src',
  dirDist :      'dist',
  dirStatic :    'static',

  compiler: {
    compilerStats: {
      children :  false,
      chunks   :  false,
      colors   :  true,
      modules  :  false
    },
    failOnWarning: false,
    venors: ['react', 'react-dom']
  }

}

module.exports = config;
