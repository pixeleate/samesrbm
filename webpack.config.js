const path = require('path');

module.exports = {
    entry: './src/index.jsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'mandm.bundle.js'
    },
    externals: {
        react: 'React'
    },
    devServer: {
        contentBase: './dist'
    }
  };
