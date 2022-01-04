const fs = require('fs-extra')
const sourceMap = require('source-map')

const file = '/Users/klook/WebstormProjects/klook-nuxt-web-test/.nuxt/dist/client/layouts-default-desktop-a4eec8.js'
const mapFile = `${file}.map`
const source = fs.readFileSync(mapFile).toString()

async function run() {
  const consumer = await new sourceMap.SourceMapConsumer(source)
  const sm = consumer.originalPositionFor({
    line: 1,
    column: 16749
  })
  const sources = consumer.sources
  const smIndex = sources.indexOf(sm.source)

  const smContent = consumer.sourcesContent[smIndex]
  const rawLines = smContent.split(/\r?\n/g)

  const msg = {
    line: sm.line,
    column: sm.column,
    code: rawLines[sm.line - 1]
  }

  debugger

  const whatever = await sourceMap.SourceMapConsumer.with(source, null, (consumer) => {
    return consumer.originalPositionFor({
      line: 1,
      column: 16749
    })
  })

  console.log(whatever)
  debugger
}

run()
