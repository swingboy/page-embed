const OSS = require('ali-oss')
const { version } = require('../package.json')
const conf = require('./conf')

const oss = new OSS({
  region: conf.region,
  accessKeyId: conf.accessKeyId,
  accessKeySecret: conf.accessKeySecret,
  bucket: conf.bucket
})

module.exports = {
  post: (filename, filepath) => {
    return oss.put(`${conf.prefix}/${version}/${filename}`, filepath)
  },
  del: filename => {
    return oss.delete(conf.prefix + '/' + filename)
  }
}
