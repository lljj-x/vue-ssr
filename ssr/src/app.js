import Vue from 'vue';
import Router from 'vue-router';
import { createStore } from './store';

import App from './view/App';

import Home from './view/components/Home.vue';
import Detail from './view/components/Detail.vue';

Vue.use(Router);

export function createApp() {
    // router
    const router = new Router({
        mode: 'history',
        routes: [{
            name: 'home',
            path: '/',
            // component: () => import('./view/components/Home.vue')
            component: Home

        }, {
            name: 'detail',
            path: '/detail/:id?',
            // component: () => import('./view/components/Detail.vue')
            component: Detail
        }]
    });

    // store
    const store = createStore();

    const app = new Vue({
        render: h => h(App),
        store,
        router
    });

    return {
        app,
        router,
        store
    };
}
