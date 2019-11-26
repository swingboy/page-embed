'use strict';

const path = require('path');
const args = require('minimist')(process.argv.slice(2));

process.env.NODE_ENV = args.env; // args.dev is ’production‘ or ’production‘
process.env.APP_ID = ''

/**
 * Build the webpack configuration
 * @param  {String} argsObj The process args
 * @return {Object} Webpack config
 */

function buildConfig (argsObj) {
  let config = require(path.join(__dirname, `wpkCfg/${argsObj.cdn || argsObj.env}.config`));
  return config;
}

module.exports = buildConfig(args);
