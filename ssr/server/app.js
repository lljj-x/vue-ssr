const Vue = require('vue');

exports.createApp = function createApp(context) {
    return new Vue({
        data: {
            url: context.url,
        },
        template: `<div id="app">Current url: {{ url }}</div>`
    })
}
