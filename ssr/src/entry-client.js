import { createApp } from './app';

const { app, store } = createApp();

// eslint-disable-next-line no-underscore-dangle
if (window.__INITIAL_STATE__) {
    // eslint-disable-next-line no-underscore-dangle
    store.replaceState(window.__INITIAL_STATE__);
}

// 这里假定 App.vue 模板中根元素具有 `id="app"`
app.$mount('#app');
