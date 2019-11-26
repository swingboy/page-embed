const path = require('path')
const fs = require('fs')
const { post } = require('./oss')
const ProgressBar = require('./progress')
const pb = new ProgressBar('上传进度', 50)

const getAllFile = async () => {
  return new Promise((resolve, reject) => {
    const paths = []
    let assets = path.resolve(__dirname, '../assets')
    if (!fs.existsSync(assets)) {
      return reject(`${assets}目录不存在，打包后重试`)
    }
    const exprExpr = new RegExp(`^${assets}/`)
    const read = doc => {
      const files = fs.readdirSync(doc)
      if (files) {
        files.forEach(name => {
          if (!/^\./.test(name)) {
            const subPath = `${doc}/${name}`
            const stats = fs.statSync(subPath)

            if (stats.isFile()) {
              if (path.extname(name) !== '.map') {
                paths.push(subPath.replace(exprExpr, ''))
              }
            } else if (stats.isDirectory()) {
              read(subPath)
            }
          }
        })
      }
    }

    read(assets)

    resolve(paths)
  })
}

const run = async () => {
  getAllFile().then(async files => {
    let length = files.length
    let num = 0
    for (let file of files) {

      pb.render(++num, length)
      await post(file, path.resolve(__dirname, '../assets/', file))
    }
  }).catch(err => {
    process.stdout.write(err + '\n')
  })
}

run()
