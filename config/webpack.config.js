const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';

/**
 * Rules
 */

const babelRule = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
  },
};

const htmlRule = {
  test: /\.html$/,
  use: {
    loader: 'html-loader',
  },
};

const cssRule = {
  test: /\.css$/,
  use: [
    MiniCSSExtractPlugin.loader,
    'css-loader',
  ],
};

/**
 * Plugins Configuration
 */

const HTMLWebpackPluginConfig = {
  template: path.resolve(__dirname, '../src/index.html'),
  filename: 'index.html',
  inject: true,
  minify: isDev && {
    html5: true,
    collapseWhitespace: true,
    caseSensitive: true,
    removeComments: true,
    removeEmptyElements: false,
  },
};

const MiniCSSExtractPluginConfig = {
  filename: '[name]-styles.css',
  // chunkFilename: '[id].css',
  ignoreOrder: false,

};

/**
 * Webpack Configuration
 */

const outputFormatConfig = {
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
};

const optimizationConfig = {
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({}),
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'main',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
};

const devServerConfig = {
  devtool: isDev && 'source-map',
  devServer: {
    host: '0.0.0.0',
    port: '3000',
    open: true,
    watchContentBase: true,
  },
};

const webpackConfig = {
  entry: path.resolve(__dirname, '../src/script.js'),
  ...outputFormatConfig,
  ...optimizationConfig,
  ...devServerConfig,
  module: {
    rules: [
      babelRule,
      htmlRule,
      cssRule,
    ],
  },
  plugins: [
    new HTMLWebpackPlugin(HTMLWebpackPluginConfig),
    new MiniCSSExtractPlugin(MiniCSSExtractPluginConfig),
  ],
};

module.exports = webpackConfig;
