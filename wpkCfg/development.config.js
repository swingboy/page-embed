const path = require('path');
const baseConfig = require('./base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
let {pageArr} = require('../globalUtil');

const plugins = pageArr.map(p => {
  return new HtmlWebpackPlugin({
    filename: `${p}.html`, //生成的html存放路径，相对于 path
    template: `./sample/dev/${p}.html`, //html模板路径
    inject: true,
    chunks: [p]
  })
})

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, "../"), // 需要提供静态服务根目录
    disableHostCheck: true, // 禁止检查hostname
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    port: 80,
    host: "0.0.0.0",
    proxy: {
      '/api': {
        target: 'https://api-xxx.com/route',
        pathRewrite: {'^/api' : ''},
        secure: false,
        changeOrigin: true
      }
    }
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    ...plugins
  ]
})
