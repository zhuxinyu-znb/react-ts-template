const { resolve, join } = require('path');/* *************************** 获取path*/
const merge = require('webpack-merge');/* ****************************** 合并webpack的配置文件*/
const argv = require('yargs-parser')(process.argv.slice(2));/* ********* 获取执行命令的参数*/
const _mode = argv.mode || 'development';/* **************************** 获取对应的参数*/
const _mergeConfig = require(`./config/webpack.${_mode}.js`);/* ******** 根据参数获取对应的webpack配置文件*/
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');/* ** 监控打包时间*/
const smp = new SpeedMeasurePlugin();
const ProgressBarPlugin = require('progress-bar-webpack-plugin');/* **** 开启打包进度*/
const { CleanWebpackPlugin } = require('clean-webpack-plugin');/* ****** 清除dist中的东西 */
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');/* ***** 打包css */
const _isDev = _mode === 'development';/* ******************************* 判断是否是开发环境 */
const ManifestPlugin = require('webpack-manifest-plugin');/* *********** 映射缓存 */
const env = require('./config/env')[_mode];/* ********************************* 引入publicPath */
const cssLoaders = require('./config/cssLoaders.js')/* ***************** 引入css-loader配置 */
const baseCssLoaders = _isDev ? ['style-loader'] : [{
    loader: MiniCSSExtractPlugin.loader,
}]

// 图片的loader
const imageloaders = [
    {
        loader: 'url-loader',
        options: {
            limit: 10 * 1024,
            name: _isDev ? 'images/[name].[ext]' : 'images/[name].[hash:5].[ext]',
            publicPath: env.publicPath
        }
    }
]
// 上线时对图片进行压缩处理
if (!_isDev) imageloaders.push({
    loader: 'image-webpack-loader',
    options: {
        bypassOnDebug: true, // webpack@1.x        
        disable: true, // webpack@2.x and newer      
    },
})

const webpackConfig = {
    mode: _mode,
    target: 'web',
    entry: {
        app: join(__dirname, './src/client/index.tsx')
    },
    output: {
        filename: _isDev ? 'scripts/[name].js' : 'scripts/[name].[contenthash:5].js',
        path: join(__dirname, './dist/assets'),
        publicPath: env.publicPath
    },
    module: {
        rules: [
            {
                test: /\.(le|c)ss$/,
                use: [
                    ...baseCssLoaders,
                    ...cssLoaders
                ]
            },
            {
                test: /\.(js|jsx|ts|tsx)$/,
                include: [resolve("src")],
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: _isDev ? ['dynamic-import-node'] : []
                        }
                    },
                    'eslint-loader']
            },
            {
                test: /.svg$/,
                use: ['@svgr/webpack', 'url-loader'],
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|woff|woff2|ttf|svg|otf)$/,
                use: imageloaders
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10 * 1024,
                    name: _isDev ? 'medias/[name].[ext]' : 'medias/[name].[hash:5].[ext]',
                    publicPath: env.publicPath
                }
            }
        ]
    },
    resolve: {
        alias: {
            '@assets': resolve('src/client/assets'),
            '@components': resolve('src/client/components'),
            "@models": resolve('src/client/models'),
            '@stores': resolve('src/client/stores'),
            '@pages': resolve('src/client/pages'),
            '@utils': resolve('src/client/utils')
        },
        modules: ['node_modules', resolve('src')],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCSSExtractPlugin({
            filename: _isDev ? 'styles/[name].css' : 'styles/[name].[hash:5].css',
            chunkFilename: _isDev ? 'styles/[id].css' : 'styles/[id].[hash:5].css'
        }),
        new ManifestPlugin(),
        new ProgressBarPlugin(),
    ]
}

module.exports = smp.wrap(merge(_mergeConfig, webpackConfig));