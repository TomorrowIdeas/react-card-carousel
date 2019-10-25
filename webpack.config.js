var path = require('path');

module.exports = {
  mode: 'production',
  entry: `${ __dirname }/src/Cards.jsx`,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|build)/,
        use: 'babel-loader'
      }
    ]
  },
  externals: {
    'react': 'commonjs react'
  }
};