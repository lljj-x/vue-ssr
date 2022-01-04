const path = require('path')
const babel = require('@babel/core')
const glob = require('glob')
const pMap = require('p-map')
const fs = require('fs-extra')

// dist file
const distDir = path.resolve(__dirname, '../.nuxt/dist/client')
const files = glob.sync(`${distDir}/**/*.js`)

// output file
const outputConf = {
  path: path.resolve(__dirname, './output'),
  fileName: 'used-svg.csv'
}

function fileInspect(fileName) {
  return new Promise((resolve, reject) => {
    babel.transformFile(fileName, {
      plugins: [
        [
          require('./src/index'),
          outputConf
        ]
      ],
      sourceType: 'script',
      presets: [
        ['@babel/preset-env', {
          targets: {
            chrome: '58',
            ie: '11'
          }
        }]
      ]
    }, (error) => {
      if (error) {
        reject(error)
        return
      }
      resolve()
    })
  })
}

async function run() {
  // delete dist
  fs.removeSync(outputConf.path)
  fs.ensureDirSync(outputConf.path)

  await pMap(files, fileInspect, { concurrency: 4 })

  // 映射雪碧图源文件

  console.log('Success: svg分析成功')
}

run()
