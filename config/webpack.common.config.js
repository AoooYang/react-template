const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { DefinePlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { merge } = require('webpack-merge');
const paths = require('./paths');

const cssReg = /\.css$/;
const cssModuleReg = /\.module\.css$/;
const sassReg = /\.s[ac]ss$/;
const sassModuleReg = /\.module\.s[ac]ss$/;

const config = (env) => {
  const isDev = env === 'develop';
  const getStyleLoaders = (cssOptions, extra) => {
    const loaders = [
      isDev && 'style-loader',
      !isDev && {
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: 'css-loader',
        options: cssOptions,
      },
      'postcss-loader',
    ].filter(Boolean);
    if (extra) {
      loaders.push({
        loader: extra,
      });
    }
    return loaders;
  };

  return {
    entry: './src/index.tsx',
    output: {
      filename: 'js/[name].bundle.js',
      path: path.resolve(__dirname, '../build'),
      chunkFilename: 'js/[name]_[hash:6]_chunk.js',
      library: {
        name: 'FileSDK',
        type: 'umd',
        umdNamedDefine: true,
      },
    },
    stats: 'errors-warnings',
    resolve: {
      extensions: ['.js', '.json', '.vue', '.jsx', '.ts', '.tsx'],
    },
    module: {
      rules: [
        {
          test: cssReg,
          exclude: [/node_modules/, cssModuleReg],
          use: getStyleLoaders({
            importLoaders: 1,
            modules: {
              mode: 'icss',
            },
          }),
          sideEffects: true,
        },
        {
          test: cssModuleReg,
          exclude: /node_modules/,
          use: getStyleLoaders({
            importLoaders: 1,
            modules: {
              mode: 'local',
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
          }),
        },
        {
          test: sassReg,
          exclude: [sassModuleReg, /node_modules/],
          use: getStyleLoaders(
            {
              importLoaders: 2,
              modules: {
                mode: 'icss',
              },
            },
            'sass-loader',
          ),
          sideEffects: true,
        },
        {
          test: sassModuleReg,
          exclude: /node_modules/,
          use: getStyleLoaders(
            {
              importLoaders: 2,
              modules: {
                mode: 'local',
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            },
            'sass-loader',
          ),
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          type: 'asset',
          exclude: /node_modules/,
          generator: {
            filename: 'img/[name]_[hash:8][ext]',
          },
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: require.resolve('@svgr/webpack'),
              options: {
                prettier: false,
                svgo: false,
                svgoConfig: {
                  plugins: [{ removeViewBox: false }],
                },
                titleProp: true,
                ref: true,
              },
            },
            {
              loader: require.resolve('file-loader'),
              options: {
                name: 'img/[name]_[hash:8].[ext]',
              },
            },
          ],
          issuer: /\.[jt]sx?$/
        },
        {
          test: /\.(jsx?|tsx?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                sourceType: 'module',
              },
            },
          ],
        },
        {
          test: /\.(ttf|eot|woff2?)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'font/[name]_[hash:8][ext]',
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'sdk demo',
        template: './public/index.html',
      }),
      new DefinePlugin({
        BASE_URL: '"./"'
      }),
      new CopyPlugin({
        patterns: [
          {
            from: "public",
            globOptions: {
              ignore: [
                "**/index.html",
              ],
            }

          },

        ],
      }),
      new ESLintPlugin({
        fix: true,
        extensions: ['jsx', 'js', 'jsx', 'tsx'],
        context: 'src',
        exclude: 'node_modules',
      }),
      new ForkTsCheckerWebpackPlugin(),
    ],
  };
};

const useWebpackConfig = fs.existsSync(paths.appWebpackConfig);

let externalConfig = {};
if (useWebpackConfig) {
  externalConfig = require(paths.appWebpackConfig);
}

module.exports = (env) => merge(config(env), externalConfig);
