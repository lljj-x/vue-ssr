const { createApp } = require('./app');
const server = require('express')();

// render
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./index.template.html', 'utf-8')
})

// router
server.get('*', (req, res) => {
    renderer.renderToString(createApp({
        url: req.url
    }), {
        title: 'This is Title'
    }).then(html => {
        return res.end(html);
    })
});

server.listen(8080);
