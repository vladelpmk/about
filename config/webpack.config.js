const path = require('path');
const project = require('./project.config');
//webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const inProject = path.resolve.bind(path, project.dirBase);
const inProjectSrc = (file) => inProject( project.dirSource, file);

const extractStye = new ExtractTextPlugin({
  filename: '[name][contenthash].css',
  allChunks: true
});

var config = {
  context: project.dirBase,
  entry: inProjectSrc('index.js'),
  output: {
    path: inProject(project.dirDist),
    filename: "script.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }, {
        test: /\.css$/,
        use: extractStye.extract(['css-loader'])
      }, {
        test: /\.(sass|scss)$/,
        use: extractStye.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }]
        })
      }, {
        test : /\.(png|jpg|gif)$/,
        use  : {
          loader: 'url-loader',
          options : {
            limit : 8192
          }
        }
      }
    ]
  },
  plugins: [
    extractStye,
    new HtmlWebpackPlugin({
      template: inProjectSrc('index.html'),
      filename: 'index.html'
    })
  ]
}

//url-loader for fonts and svgs
;[
  ['woff', 'application/font-woff'],
  ['woff2', 'application/font-woff2'],
  ['otf', 'font/opentype'],
  ['ttf', 'application/octet-stream'],
  ['eot', 'application/vnd.ms-fontobject'],
  ['svg', 'image/svg+xml']
].forEach((font) => {
  const extension = font[0];
  const mimetype = font[1];

  config.module.rules.push({
    test    : new RegExp(`\\.${extension}$`),
    loader  : 'url-loader',
    options : {
      name  : 'fonts/[name].[ext]',
      limit : 10000,
      mimetype
    }
  });
});

module.exports = config;
