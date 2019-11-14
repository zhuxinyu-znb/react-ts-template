const WebpackBuildNotifierPlugin = require('webpack-build-notifier');/* **************** 开启通知面板 */
const HtmlWebpackPlugin = require('html-webpack-plugin');/* **************************** 插入html*/
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');/**************** 开启多核打包 */
const os = require('os');/* ************************************************************ 调用os */
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');/* ******* 压缩css */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;/* 打包后进行分析 */
const { resolve } = require('path');


module.exports = {
    optimization: {
        minimize: true,
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: false,
            cacheGroups: {
                commons: {
                    chunks: "initial",
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0,
                    name: "commons"
                },
                // 合并所有css
                // styles: {
                //   name: 'style',
                //   test: /\.(css|scss)$/,
                //   chunks: 'all',
                //   minChunks: 1,
                //   enforce: true
                // }
            }
        }
    },
    plugins: [
        new OptimizeCSSAssetsPlugin({}),
        new HtmlWebpackPlugin({
            title: 'CRM系统',
            filename: 'index.html',
            template: resolve(__dirname, '../src/client/index-prod.html'),
            minify: {
                minifyJS: true,
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
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
                    beautify: false,
                    comments: false,
                },
                compress: {
                    warnings: false,
                    drop_console: true,
                    collapse_vars: true
                }
            }
        }),
        new BundleAnalyzerPlugin(
            {
                analyzerMode: 'server',
                analyzerHost: '127.0.0.1',
                analyzerPort: 8889,
                reportFilename: 'report.html',
                defaultSizes: 'parsed',
                openAnalyzer: true,
                generateStatsFile: false,
                statsFilename: 'stats.json',
                statsOptions: null,
                logLevel: 'info'
            }
        ),
    ]
}