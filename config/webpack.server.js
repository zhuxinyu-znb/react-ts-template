const { join, resolve } = require("path");
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: "production",
  target: "node",
  entry: {
    app: join(__dirname, "../src/client/server-entry.tsx")
  },
  output: {
    filename: "assets/server-entry.js",
    path: join(__dirname, '../dist'),
    // path: join(__dirname, '../src/server'),
    libraryTarget: 'commonjs2'
  },
  externals: {
    'AMap': 'AMap',
    'react': {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        loader: 'ignore-loader'
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [resolve("src")],
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|woff|woff2|ttf|svg|otf)$/,
        include: [resolve("src")],
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
          }
        ]
      },
    ]
  },
  resolve: {
    alias: {
      "@assets": resolve("src/client/assets"),
      "@components": resolve("src/client/components"),
      "@models": resolve("src/client/models"),
      "@pages": resolve("src/client/pages"),
      "@interface": resolve("src/client/interface"),
      "@utils": resolve("src/client/utils")
    },
    modules: ["node_modules", resolve("src")],
    extensions: [".js", ".ts", ".tsx", "jsx"]
  },
  // 服务端渲染把相关的依赖都去掉
  // 也可以这样写 const nodeExternals = require('webpack-node-externals')
  //   externals: [nodeExternals].
  //   externals: Object.keys(require('./package.json').dependencies),
  // devServer: {
  //   compress: true,
  //   port: '3000',
  //   contentBase: join(__dirname, '../dist'),
  //   disableHostCheck: true,
  //   historyApiFallback: true,
  // },
}