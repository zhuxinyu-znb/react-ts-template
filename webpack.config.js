const { resolve } = require('path');/* ********************************* 获取path*/
const merge = require('webpack-merge');/* ****************************** 合并webpack的配置文件*/
const argv = require('yargs-parser')(process.argv.slice(2));/* ********* 获取执行命令的参数*/
const _mode = argv.mode || 'development';/* **************************** 获取对应的参数*/
const _mergeConfig = require(`./config/webpack.${_mode}.js`);/* ******** 根据参数获取对应的webpack配置文件*/
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');/* ** 监控打包时间*/
const smp = new SpeedMeasurePlugin();
const ProgressBarPlugin = require('progress-bar-webpack-plugin');/* **** 开启打包进度*/
const { CleanWebpackPlugin } = require('clean-webpack-plugin');/* ****** 清除dist中的东西 */
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');/* ***** 打包css */
const isDev = _mode === 'development';/* ******************************* 判断是否是开发环境 */
const ManifestPlugin = require('webpack-manifest-plugin');/* *********** 映射缓存 */
const env = require('./config/env');/* ********************************* 引入publicPath */

const webpackConfig = {
    entry: {
        app: resolve('./src/web/index.tsx')
    },
    output: {
        publicPath: env[_mode].publicPath
    },
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: [
                    {
                        loader: MiniCSSExtractPlugin.loader,
                    },
                    'css-loader',
                    'less-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(tsx|ts|jsx|js)$/,
                include: [resolve('src')],
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.(jpg|png|jpeg|gif|eot|woff|woff2|ttf|svg|otf)$/,
                include: [resolve('src')],
                exclude: /node_modules/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10 * 1024,
                        name: isDev ? "static/[name].[ext]": "static/[name].[hash:5].[ext]",
                        publicPath: env[_mode].publicPath
                    }
                },
            }
        ]
    },
    optimization:{
        splitChunks:{
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    name: 'common',
                    minChunks: 1,
                    maxInitialRequests: 5,
                    minSize: 0
                }
            }
        },
        runtimeChunk:{
            name: 'runtime'
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCSSExtractPlugin({
            filename: isDev ? 'styles/[name].css' : 'styles/[name].[hash:5].css',
            chunkFilename: isDev ? 'styles/[id].css' : 'styles/[id].[hash:5].css'
        }),
        new ManifestPlugin(),
        new ProgressBarPlugin(),
    ]
}

module.exports = smp.wrap(merge(_mergeConfig, webpackConfig));