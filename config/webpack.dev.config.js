const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const commonConfig = require('./webpack.common.config');

module.exports = merge(
  {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
      hot: true,
      compress: true,
    },
    plugins: [new ReactRefreshWebpackPlugin()],
  },
  commonConfig('develop'),
);
