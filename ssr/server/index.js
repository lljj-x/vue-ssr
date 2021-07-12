// const { serverApp } = require('../dist/node/static/js/entryServer');
const server = require('express')();

// render
// const renderer = require('vue-server-renderer').createRenderer({
//     template: require('fs').readFileSync('./index.template.html', 'utf-8')
// });

// mainfest json 注入资源文件
const serverBundle = require('../dist/node/vue-ssr-server-bundle.json')
const clientManifest = require('../dist/web/vue-ssr-client-manifest.json')

const renderer = require('vue-server-renderer').createBundleRenderer(serverBundle, {
    template: require('fs').readFileSync('./index.template.html', 'utf-8'),
    clientManifest
})

function render (req, res) {
    res.setHeader("Content-Type", "text/html")

    const handleError = err => {
        if (err.url) {
            res.redirect(err.url)
        } else if(err.code === 404) {
            res.status(404).send('404 | Page Not Found')
        } else {
            // Render Error Page or Redirect
            res.status(500).send('500 | Internal Server Error')
            console.error(`error during render : ${req.url}`)
            console.error(err.stack)
        }
    }

    const context = {
        title: 'Vue HN 2.0', // default title
        url: req.url,
        state: req.state
    }
    renderer.renderToString(context, (err, html) => {
        if (err) {
            return handleError(err)
        }
        res.send(html)
    })
}

// router
server.get('*', (req, res) => {
    render(req, res);

    // serverApp(req).then(app => {
    //     renderer.renderToString(app, {
    //         title: 'Test SSR',
    //         state: req.state
    //     }, (err, html) => {
    //         if (err) {
    //             if (err.code === 404) {
    //                 res.status(404).end('Page not found')
    //             } else {
    //                 res.status(500).end('Internal Server Error')
    //             }
    //         } else {
    //             res.end(html)
    //         }
    //     })
    // })
});

server.listen(9999);
