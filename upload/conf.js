
module.exports = {
  "accessKeyId": "xxxxx", // CDN 账号信息
  "accessKeySecret": "xxx",
  "bucket": "xxx",
  "prefix": process.argv.includes('--dev') ? "CDN dev 目录" : "正式环境目录",
  "region": "oss-cn-cc",
  "urlPrefix": "https://nihao.hello.com/" //test
}
