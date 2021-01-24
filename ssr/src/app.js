import Vue from 'vue';
import Router from 'vue-router';
import App from './view/App';

Vue.use(Router);

exports.createApp = function createApp(context) {
    const router = new Router({
        mode: "history",
        routes: [{
            path: '/',
            component: () => import('./view/components/Home.vue')
        },{
            path: '/detail/:id',
            component: () => import('./view/components/Detail.vue')
        }]
    });

    return new Vue({
        render: h => h(App),
        router
    });
}
