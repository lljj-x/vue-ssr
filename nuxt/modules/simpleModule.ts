import { Module } from '@nuxt/types'
import path from 'path'


const simpleModule: Module = function (moduleOptions) {
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options: {
      pluginName: 'testPlugin',
      debug: this.options.debug
    }
  });
}

export default simpleModule;
