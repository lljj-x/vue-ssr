const path = require('path')
const fs = require('fs-extra')
const sourceMap = require('source-map')

const iconSet = new Set()

// n("svg-icon", {
//   staticClass: "banner-search_icon",
//   attrs: {
//     name: "desktop-common#search",
//     size: "24"
//   }
// })

const defaultOpts = {
  path: path.resolve(__dirname, '../output'),
  fileName: 'used-svg.csv'
}

const svgComponents = [
  {
    name: 'SvgIcon',
    component: ['SvgIcon', 'svgIcon', 'svg-icon'],
    attr: 'name'
  },
  {
    name: 'KlkIcon',
    component: ['KlkIcon', 'klkIcon', 'klk-icon'],
    attr: 'type'
  }
]

async function formatErrMsg(file, positionObj) {
  const mapFile = `${file}.map`
  const source = fs.readFileSync(mapFile).toString()

  const whatever = await sourceMap.SourceMapConsumer.with(source, null, (consumer) => {
    return consumer.originalPositionFor(positionObj)
  })

  debugger
  console.log(whatever)
}

module.exports = function ({ types }, opts = {}) {
  const options = Object.assign({}, defaultOpts, opts)

  const addData = (iconName, componentName = 'SvgIcon', errMsg, errSource) => {
    // err，err source file
    iconSet.add(`${componentName},${iconName},${errMsg},${errSource}`)
    console.log(`iconName: ${iconName}`)

    fs.writeFile(path.resolve(options.path, options.fileName), [...iconSet].join('\n'), (err) => {
      if (err) {
        console.error(err)
      }
    })
  }

  // addData('test_test_test_11')

  return {
    name: 'svg-inspect',
    visitor: {
      CallExpression(path, fileInfo) {
        if (path.node.arguments.length > 0) {
          const [argCom, argProps] = path.node.arguments
          if (
            types.isStringLiteral(argCom) &&
            types.isObjectExpression(argProps)
          ) {
            const svgComponent = svgComponents.find((cItem) => {
              return cItem.component.includes(argCom.value)
            })

            // 查找是否为 svg 组件
            if (!svgComponent) { return }

            const attrNode = (argProps.properties || []).find((item) => {
              return ['props', 'attrs'].includes(item.key.name) && types.isObjectProperty(item)
            })

            if (attrNode && types.isObjectExpression(attrNode.value)) {
              const nameNode = (attrNode.value.properties || []).find(item => item.key.name === svgComponent.attr)
              if (nameNode) {
                if (nameNode && types.isStringLiteral(nameNode.value)) {
                  addData(nameNode.value.value, svgComponent.name)
                } else {
                  console.warn('name|type配置为非字符串')

                  formatErrMsg(fileInfo.filename, {
                    ...nameNode.value.loc.start
                  }).then((res) => {
                    debugger
                  })
                  // addData(nameNode.value.value, svgComponent.name)
                }
              }
            } else {
              console.warn('props 配置为非对象')
            }
          }
        }
      }
    }
  }
}
