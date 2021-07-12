// const { serverApp } = require('./dist/node/static/js/entryServer');
const express = require('express');
const app = express();
const path = require('path');

// render
// const renderer = require('vue-server-renderer').createRenderer({
//     template: require('fs').readFileSync('./index.template.html', 'utf-8')
// });

const resolve = file => path.resolve(__dirname, file);

// mainfest json 注入资源文件
const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const renderer = require('vue-server-renderer').createBundleRenderer(serverBundle, {
    template: require('fs').readFileSync('./index.template.html', 'utf-8'),
    clientManifest: require('./dist/vue-ssr-client-manifest.json'),
    basedir: resolve('./dist'),
});

function render(req, res) {
    res.setHeader('Content-Type', 'text/html');

    const handleError = (err) => {
        if (err.url) {
            res.redirect(err.url);
        } else if (err.code === 404) {
            res.status(404).send('404 | Page Not Found');
        } else {
            // Render Error Page or Redirect
            res.status(500).send('500 | Internal Server Error');
            console.error(`error during render : ${req.url}`);
            console.error(err.stack);
        }
    };

    const context = {
        title: '标题', // default title
        url: req.url,
        state: req.state
    };
    renderer.renderToString(context, (err, html) => {
        if (err) {
            return handleError(err);
        }
        res.send(html);
    });
}

const serve = (path, cache) => express.static(resolve(path), {
    maxAge: 1000 * 60 * 60 * 24 * 30
});
app.use('/dist', serve('./dist', true));

// router
app.get('*', (req, res) => {
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

app.listen(9999);
