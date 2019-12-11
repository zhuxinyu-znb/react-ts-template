const HtmlWebpackPlugin = require('html-webpack-plugin');/* **************************** 插入html*/
const { resolve, join } = require('path');


module.exports = {
    target: "node",
    module: {
        rules: [
            // {
            //     test: /\.(le|c)ss$/,
            //     use: [
            //         // 'style-loader',
            //         'css-loader',
            //         'postcss-loader',
            //         'less-loader'
            //     ]
            // },
            {
                test: /\.(js|jsx|ts|tsx)$/,
                include: [resolve("src")],
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: []
                        }
                    },
                    'eslint-loader']
            },
            // {
            //     test: /.svg$/,
            //     use: ['@svgr/webpack', 'url-loader'],
            // },
            // {
            //     test: /\.(png|jpg|jpeg|gif|eot|woff|woff2|ttf|svg|otf)$/,
            //     use: {
            //         loader: 'url-loader',
            //         options: {
            //             limit: 10 * 1024,
            //             name: 'images/[name].[hash:5].[ext]',
            //         }
            //     }
            // },
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
    entry: {
        'server': resolve(__dirname, '../src/client/app-server.tsx')
    },
    output: {
        filename: '[name].js',
        path: join(__dirname, '../src/server/dist'),
    },
    plugins: [

    ]
}