const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: './dist',
      serveIndex: false,
    },
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
    setupMiddlewares: (middlewares, devServer) => {
      return middlewares.filter(middleware => {
        return middleware.name !== 'serve-index';
      });
    },
  },
});
