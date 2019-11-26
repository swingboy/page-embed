const path = require('path');
const baseConfig = require('./base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Clean = require('clean-webpack-plugin');
const Copy = require('copy-webpack-plugin');
const buildPath = path.resolve(__dirname, "../assets");
let {pageArr} = require('../globalUtil');

const plugins = pageArr.map(p => {
  return new HtmlWebpackPlugin({
      filename: `${p}.html`, //生成的html存放路径，相对于 path
      template: `./sample/build/${p}.html`, //html模板路径
      inject: true,
      chunks: [p],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true
      }
    })
})

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new Clean([buildPath]),
    new Copy([
      {from: './src/lib', to: `${buildPath}/lib` },
    ]),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    ...plugins
  ]
})
