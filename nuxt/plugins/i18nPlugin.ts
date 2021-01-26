// Module test

import Vue from 'vue';
import { Plugin } from '@nuxt/types';

const i18nPlugin: Plugin = function (ctx, inject) {
  console.log(console.log(Vue));
  console.log('ok');
}

export default i18nPlugin;
