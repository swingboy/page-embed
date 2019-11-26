
'use strict';
const path = require('path');
const fs = require('fs');

const {version} = require('./package.json');
const viewPath = path.join(__dirname, './src/view');

// publickPath
let cdnBaseHttp = '//cdn.xxx.com/';

// publickPath
let publickCdnUrl = '//cdn.xxx.com/';

// 默认的defaultExternalConfig
let defaultExternalConfig = [
  { name: 'react', scope: 'React', js: 'react.js' },
  { name: 'react-dom', scope: 'ReactDOM', js: 'react-dom.js' },
  { name: 'axios', scope: 'axios', js: 'axios.js' },
];

let pageArr = genRoutePageArr()

/*
 * 所有的静态页面名称，目前约定是名称与最后打包出的结果一致
 */

function genWpkEntry() {
  let rMap = {};
  pageArr.forEach( page => {
    rMap[page] = path.join(viewPath, `./${page}`)
  });

  return rMap;
}


// webpack 的 external 配置
function getRstExternalConfig() {

  return defaultExternalConfig.map( item => {
    return {
      ...item,
      css: item.css && [cdnBaseHttp, version, 'lib', item.css].join('/'),
      js: item.js && [cdnBaseHttp, version, 'lib', item.js].join('/')
    }

  });
}

function errLog(txt) {
  console.log('\x1B[31m%s\x1B[39m', txt);
}

// view 目录下的route
function genRoutePageArr() {

  let fileNameArr = [];
  if (!fs.existsSync(viewPath)) {
    return errLog(`${viewPath}目录不存在，请确认`);
  }

  const files = fs.readdirSync(viewPath);

  if (!files) {
    return errLog(`${viewPath}目录不存在，请确认`);
  }

  files.forEach(name => {
    // 目前非.html 格式的文件忽略
    /\.jsx$/.test(name) && fileNameArr.push(name.substring(0, name.indexOf('.')));
  })

  return fileNameArr;
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier');

  return (severity, errors) => {
    if (severity !== 'error') return;

    const error = errors[0];
    const filename = error.file && error.file.split('!').pop();

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png'),
    });
  };
};

exports.publickCdnUrl = publickCdnUrl;

exports.externalConfig = getRstExternalConfig();

exports.pageArr = pageArr;

exports.wpkEntry = genWpkEntry();

// 获取模块版本号
exports.getModulesVersion = () => {
  let mvs = {};
  let regexp = /^npm_package_.{0,3}dependencies_/gi;
  for (let m in process.env) {
    // 从node内置参数中读取，也可直接import 项目文件进来
    if (regexp.test(m)) {
      // 匹配模块
      // 获取到模块版本号
      mvs[m.replace(regexp, '').replace(/_/g, '-')] = process.env[m].replace(/(~|\^)/g, '');
    }
  }
  return mvs;
};
