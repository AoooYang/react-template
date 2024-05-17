const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = merge(
  {
    mode: 'production',
    bail: true,
    output: {
      clean: true,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[hash:5].css',
      }),
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: false, // Remove LICENSE.txt in build/js
        }),
        new CssMinimizerPlugin()
      ],
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          vendors: { // Package third-party packages into separate files
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            priority: -10,
          },
        },
      },
    }
  },
  commonConfig('production')
);
