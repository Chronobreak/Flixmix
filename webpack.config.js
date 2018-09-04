var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module : {
    rules : [
      {
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        use: ['babel-loader'],      
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  }
};