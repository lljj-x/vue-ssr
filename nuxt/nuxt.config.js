const path = require('path')
const fs = require('fs-extra')


class ExportSourceFilesPlugin {
  constructor(opts) {
    this.opts = Object.assign({
      filter: () => true,
      dirName: 'webpack-source-files',
      ...opts
    })
  }
  apply(compiler) {
    this.compiler = compiler;

    // 指定要附加到的事件钩子函数
    const filterFn = this.opts.filter
    const exportFilepath = path.resolve(this.compiler.options.output.path, this.opts.dirName)
    const cwdDir = process.cwd()

    compiler.hooks.done.tapAsync(
      'ExportSourceFilesWebpackPlugin',
      (stats, callback) => {
        const statsModules = stats.toJson().modules
        const sourceModule = statsModules.filter(({ name }) => {
          return filterFn(name)
        })

        const names = new Set(sourceModule.map(item => item.name.replace(/[\s\?].*/g, '')))

        for (const fileName of names) {
          const fromFile = path.resolve(cwdDir, fileName)
          if (fs.pathExistsSync(fromFile)) {
            fs.copySync(fromFile, path.resolve(exportFilepath, fileName))
          } else {
            console.warn('[webpack-source-files]: File does not exist, copy fail !', fileName)
          }
        }

        callback()
      }
    );
  }
}

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'firstApp',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  loading: { color: '#ff5722' },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/i18nPlugin'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      '~/modules/simpleModule',
      {
        param1: 111,
        param2: {
          key: 'value'
        },
      }
    ]
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }

      if (ctx.isClient) {
        config.plugins.push(
          new ExportSourceFilesPlugin({
            dirName: 'webpack-source-files',
            filter(name) {
              return !['node_modules', '.nuxt', '(webpack)'].some(item => name.includes(item))
            }
          })
        )
      }

      if (!ctx.isDev && ctx.isClient) {
        config.devtool = 'source-map'
      }
    }
  }
}
