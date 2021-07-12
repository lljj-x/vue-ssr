/**
 * Created by Liu.Jun on 2019/10/25 15:42.
 */

const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const chalk = require('chalk');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin.js');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin.js');
const nodeExternals = require('webpack-node-externals');

const log = require('./scripts/log');
const envConfig = require('./scripts/envConfig').getConfig();

const target = envConfig.target || 'web';
const isWatch = envConfig.watch || false;
const isClient = target === 'web';

// entry client 和 server 分开构建
const {
    entries, openPage
} = {
    entries: isClient ? {
        entryClient: './src/entry-client.js'
    } : {
        entryServer: './src/entry-server.js',
    },
    openPage: '/'
};


log({
    data: chalk.green(openPage),
    des: 'openPage'
});

log({
    data: Object.entries(entries).map(([key, value]) => ({
        [key]: value.entry
    })),
    des: 'entry'
});

const isProduction = process.env.NODE_ENV === 'production';

// config var
const outputDir = path.resolve(__dirname, './dist');

module.exports = {
    // cdn
    publicPath: isProduction ? '/dist' : '/',

    // 资源目录
    outputDir,

    assetsDir: 'static',

    filenameHashing: false,

    pages: entries,

    lintOnSave: true,

    runtimeCompiler: true,

    transpileDependencies: [],

    productionSourceMap: false,

    configureWebpack: (config) => {
        config.target = target;
        // config.mode = 'development';
        // config.devtool = 'source-map';

        if (!isClient) {
            config.output.libraryTarget = 'commonjs2';
            config.externals = nodeExternals({
                // 不要外置化 webpack 需要处理的依赖模块。
                // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
                // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
                allowlist: /\.css$/
            });
        }

        if (isWatch) {
            config.watch = true;
            config.watchOptions = {
                poll: 1000, // 每秒询问多少次
                aggregateTimeout: 500, // 防抖 多少毫秒后再次触发
                ignored: /node_modules/ // 忽略时时监听
            };
        }
    },

    // webpack 链接 API，用于生成和修改 webpack 配置
    // https://github.com/mozilla-neutrino/webpack-chain
    chainWebpack: (config) => {
        // 指定文件提取
        const splitConfig = {
            cacheGroups: {}
        };
        config.optimization.splitChunks(splitConfig);

        // 指定ssr  plugin
        if (isClient) {
            config.plugin('vue-server-renderer-client').use(VueSSRClientPlugin);
        } else {
            config.plugin('vue-server-renderer-server').use(VueSSRServerPlugin);
        }

        if (isProduction) {
            // 资源表
            config.plugin('manifest').use(ManifestPlugin, [{
                fileName: 'manifest.json',
                filter: (obj) => {
                    const ext = path.extname(obj.name);
                    const includeExts = ['.js', '.css'];
                    return includeExts.includes(ext) && !obj.name.includes('chunk-');
                }
            }]);
        }

        // report
        if (envConfig.report) {
            // eslint-disable-next-line global-require
            const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
            config.plugin('bundle-analyzer').use(BundleAnalyzerPlugin);
        }

        // 移除 prefetch 插件
        Object.keys(entries).forEach((item) => {
            config.plugins.delete(`prefetch-${item}`);

            config.plugins.delete(`prefetch-${item}`);
        });
    },

    css: {
        requireModuleExtension: true,
        sourceMap: !isProduction,
        extract: isProduction
    },

    // All options for webpack-dev-server are supported
    // https://webpack.js.org/configuration/dev-server/
    devServer: {
        clientLogLevel: 'info',
        open: true,
        openPage,
        port: 8800,
        host: '127.0.0.1',
        overlay: {
            warnings: false,
            errors: true
        },
        publicPath: '/',
        proxy: {
            '/api-dev': {
                target: 'http://www.api.com',
                hot: true,
                open: true,
                contentBase: false,
                historyApiFallback: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api-dev': ''
                }
            }
        }
    },

    // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},

    // 第三方插件配置
    pluginOptions: {}
};
