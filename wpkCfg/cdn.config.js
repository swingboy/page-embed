const path = require('path');
const baseConfig = require('./base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Clean = require('clean-webpack-plugin');
const Copy = require('copy-webpack-plugin');
const buildPath = path.resolve(__dirname, "../assets");
const args = require('minimist')(process.argv.slice(2));
let {pageArr, externalConfig, publickCdnUrl} = require('../globalUtil');
const {version} = require('../package.json');

const plugins = pageArr.map(p => {
  return new HtmlWebpackPlugin({
      filename: `${p}.html`, //生成的html存放路径，相对于 path
      template: `./sample/${args.cdn ? args.cdn : 'build'}/${p}.html`, //html模板路径
      inject: true,
      chunks: [p],
      minify: {
        removeComments: false,
        collapseWhitespace: false,
        minifyCSS: false,
        minifyJS: false
      },
      cdnConfig: externalConfig, // cdn配置
    })
})

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    publicPath: publickCdnUrl + '/' +  version,
  },

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
