const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');/* 友好提示 */
const HtmlWebpackPlugin = require('html-webpack-plugin');/* ******************** 插入html*/
const { resolve } = require('path')


module.exports = {
    output:{
        filename: 'script/[name].bundles.js', // 指定一下打包文件的输出地址
        path: resolve(__dirname, '../dist'),
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: resolve(__dirname, '../dist'),
        historyApiFallback: true,
        port: 3000, // 端口号
        hot: true, // 开启热更新
        open: true // 自动打开浏览器
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'src/web/index-dev.html',
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