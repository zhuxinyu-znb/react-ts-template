const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');/* 友好提示 */
const HtmlWebpackPlugin = require('html-webpack-plugin');/* ******************** 插入html*/
const { resolve, join } = require('path')
const Jarvis = require('webpack-jarvis')
const webpack = require('webpack');
const fs = require('fs');
const { appPackageJson } = require('./my-dev-utils');
const apiMocker = require('webpack-api-mocker');
const mocker = resolve(__dirname, '../src/client/mocks/index.js');

module.exports = {
  devtool: 'eval-source-map',
  devServer: {
    compress: true,
    port: 3000,
    proxy: {
      '/': appPackageJson.proxy
    },
    before: (app, server) => {
      apiMocker(app, mocker, {
        changeHost: true
      });
    },
    contentBase: join(__dirname, '../dist'),
    hot: true,
    open: true,
    overlay: {
      errors: true,
      warnings: true
    },
    // disableHostCheck: true,
    publicPath: '/',
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new Jarvis({ port: 1337 }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index-dev.html',
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running here http://localhost:3000'],
        notes: ['Some additionnal notes to be displayed unpon successful compilation']
      },
      onErrors: function (severity, errors) {
        // You can listen to errors transformed and prioritized by the plugin
        // severity can be 'error' or 'warning'
      },
      // should the console be cleared between each compilation?
      // default is true
      clearConsole: true,

      // add formatters and transformers (see below)
      additionalFormatters: [],
      additionalTransformers: []
    }),
  ]
}