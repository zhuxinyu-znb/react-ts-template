const WebpackBuildNotifierPlugin = require('webpack-build-notifier');/* ********** 开启通知面板 */
const HtmlWebpackPlugin = require('html-webpack-plugin');/* ********************** 插入html*/
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');/********** 开启多核打包 */
const os = require('os');/* ****************************************************** 调用os */
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');/* * 压缩css */



module.exports = {
    output: {
        filename: 'script/[name].[hash:5].bundles.js',
    },
    plugins: [
        new OptimizeCSSAssetsPlugin({}),
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'src/web/index-dev.html',
        }),
        new WebpackBuildNotifierPlugin({
            title: '我的webpack',  // 可以起一个项目名字
            // logo: path.resolve('./img/favicon.png'),  // 可以找一个好看的小图标
            suppressSuccess: true // 显示成功
        }),
        new ParallelUglifyPlugin({
            exclude: /\.min\.js$/,
            workerCount: os.cpus().length,
            /* uglifyJS: {

            }, */
            uglifyES: {
                output: {
                    beautify:false,
                    comments: false,
                },
                compress: {
                    warnings: false,
                    drop_console: true,
                    collapse_vars: true
                }
            }
        })
    ]
}