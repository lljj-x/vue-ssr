
class MyExampleWebpackPlugin {
  constructor(opts) {
    this.opts = Object.assign({
      filter: () => true,
      ...opts
    })
  }
  apply(compiler) {
    // 指定要附加到的事件钩子函数
    const filterFn = this.opts.filter

    compiler.hooks.emit.tapAsync(
      'MyExampleWebpackPlugin',
      (compilation, callback) => {
        const statsModules = compilation.getStats().toJson().modules
        const sourceModule = statsModules.filter(({ name }) => {
          return filterFn(name)
        })
        const names = sourceModule.map(item => item.name.replace(/&|\s|\?|\+.*/g, ''))
        debugger
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
    plugins: [
      new MyExampleWebpackPlugin({
        filter(name) {
          return !(name.includes('node_modules') || name.includes('.nuxt') || name.includes('(webpack)'))
        }
      })
    ],
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }

      if (!ctx.isDev && ctx.isClient) {
        config.devtool = 'source-map'
      }
    }
  }
}
