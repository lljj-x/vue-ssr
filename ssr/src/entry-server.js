import { createApp } from './app';

export default context => new Promise((resolve, reject) => {
    const { app, router, store } = createApp();

    // 设置服务器端 router 的位置
    router.push(context.url);

    // 等到 router 将可能的异步组件和钩子函数解析完
    // eslint-disable-next-line consistent-return
    router.onReady(() => {
        const matchedComponents = router.getMatchedComponents();
        // 匹配不到的路由，执行 reject 函数，并返回 404
        if (!matchedComponents.length) {
            // eslint-disable-next-line prefer-promise-reject-errors
            return reject({ code: 404 });
        }

        const getDataMethods = matchedComponents.map((Component) => {
            // 调用组件上的 asyncData
            if (Component.asyncData) {
                return Component.asyncData({
                    context,
                    store,
                    route: router.currentRoute
                });
            }
            return Promise.resolve();
        });

        Promise.all(getDataMethods).then(() => {
            // 真实数据获取
            context.state = store.state;

            // Promise 应该 resolve 应用程序实例，以便它可以渲染
            return resolve(app);
        });
    }, reject);
});
