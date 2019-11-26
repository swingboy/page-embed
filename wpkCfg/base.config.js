const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssPresetEnv = require('postcss-preset-env');
const {version} = require('./../package.json');
const isProd = process.env.NODE_ENV === 'production';
const srcPath = path.join(__dirname, '/..', 'src');
const {wpkEntry} = require('./../globalUtil');

module.exports = {
  entry: wpkEntry,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './../assets'),
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|jsx)$/,
        loader: "eslint-loader",
        include: srcPath
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/react'],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-transform-runtime'
          ]
        },
        include: srcPath
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: 'postcss-loader', options: {
              ident: 'postcss',
              plugins: (loader) => {
                let plugins = [postcssPresetEnv({browsers: 'last 2 versions'})]
                // if (loader.resourcePath === path.resolve(__dirname, './src/scss/classroom.scss')) {
                //   plugins.push(require('./plugins/postcss-px-to-vh')({
                //     'selectorBlackList': ['body', 'html'],
                //     'minPixelValue': 2
                //   }))
                // }
                return plugins
              }
            }
          },
          "sass-loader",
        ],
        include: srcPath
      },
      {
        test: /\.(svg|png|gif)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 9999,
              outputPath: 'images', // 最后生成文件放置在根目录下的 assets/images
              publicPath: isProd ?
                `https://cdn.xxx.com/${version}/images/` : './images'
            }
          }
        ]
      },
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js', '.scss'],
    mainFiles: ['index'],
    alias: {
      "@scss": path.resolve(srcPath, './scss'),
      "@common": path.resolve(srcPath, './common'),
      "@controls": path.resolve(srcPath, './controls'),
      "@components": path.resolve(srcPath, './components'),
      "@base": path.resolve(srcPath, './components/base'),
      "@rootBase": path.resolve(srcPath, './components/rootBase'),
    }
  },
  "externals":{
    "react": "React",
    "react-dom": "ReactDOM",
    "axios": "axios",
  }
}
