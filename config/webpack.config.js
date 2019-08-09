const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

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
  minify: {
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

const webpackConfig = {
  entry: path.resolve(__dirname, '../src/script.js'),
  ...outputFormatConfig,
  ...optimizationConfig,
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
