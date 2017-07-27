const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

module.exports = (env) => {
    // Configuration in common to both client-side and server-side bundles
    const isDevBuild = !(env && env.prod);
    const sharedConfig = {
        stats: { modules: false },
        context: __dirname,
        resolve: {
            extensions: ['.js', '.ts'],
            alias: {
                "jquery-ui$": path.resolve(__dirname, 'bower_components/jquery-ui/jquery-ui.min.js'),
                globalize$: path.resolve(__dirname, 'bower_components/globalize/dist/globalize.js'),
                globalize: path.resolve(__dirname, 'bower_components/globalize/dist/globalize'),
                cldr$: path.resolve(__dirname, 'bower_components/cldrjs/dist/cldr.js'),
                cldr: path.resolve(__dirname, 'bower_components/cldrjs/dist/cldr'),
                knockout$: path.resolve(__dirname, 'bower_components/knockout/dist/knockout.js'),
                "dx-designer$": path.resolve(__dirname, 'bower_components/xtrareportsjs/js/dx-designer.js'),
                "web-document-viewer$": path.resolve(__dirname, 'bower_components/xtrareportsjs/js/web-document-viewer.js'),
                "web-document-viewer.html": path.resolve(__dirname, 'bower_components/xtrareportsjs/html/web-document-viewer.html')
            },
        },
        output: {
            filename: '[name].js',
            publicPath: '/dist/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
        },
        module: {
            rules: [
                {
                    test: require.resolve('devextreme/core/component_registrator'),
                    use: [{
                        loader: 'expose-loader',
                        options: 'DevExpress.registerComponent'
                    }]
                },
                {
                    test: require.resolve('devextreme/ui/popup'),
                    use: [{
                        loader: 'expose-loader',
                        options: 'DevExpress.ui.dxPopup'
                    }]
                },
                {
                    test: require.resolve('devextreme/data/array_store'),
                    use: [{
                        loader: 'expose-loader',
                        options: 'DevExpress.data.ArrayStore'
                    }]
                },
                {
                    test: require.resolve('devextreme/ui/drop_down_editor/ui.drop_down_editor'),
                    use: [{
                        loader: 'expose-loader',
                        options: 'DevExpress.ui.dxDropDownEditor'
                    }]
                },
                {
                    test: require.resolve('devextreme/ui/gallery'),
                    use: [{
                        loader: 'expose-loader',
                        options: 'DevExpress.ui.dxGallery'
                    }]
                },
                {
                    test: require.resolve('devextreme/core/config'),
                    use: [{
                        loader: 'expose-loader',
                        options: 'DevExpress.config'
                    }]
                },
                {
                    test: require.resolve('devextreme/ui/validation_engine'),
                    use: [{
                        loader: 'expose-loader',
                        options: 'DevExpress.validationEngine'
                    }]
                },
                {
                    test: require.resolve('devextreme/ui/notify'),
                    use: [{
                        loader: 'expose-loader',
                        options: 'DevExpress.ui.notify'
                    }]
                },
                {
                    test: require.resolve('devextreme/ui/text_box'),
                    use: [{
                        loader: 'expose-loader',
                        options: 'DevExpress.ui.dxTextBox'
                    }]
                },
                { test: /\.ts$/, include: /ClientApp/, use: ['awesome-typescript-loader?silent=true', 'angular2-template-loader'] },
                { test: /\.html$/, use: 'html-loader?minimize=false' },
                { test: /\.css$/, use: ['to-string-loader', isDevBuild ? 'css-loader' : 'css-loader?minimize'] },
                { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' }
            ]
        },
        plugins: [
            new CheckerPlugin(),
            new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery', ko: 'knockout' }),
        ],
        node: {
            fs: "empty"
        }
    };

    // Configuration for client-side bundle suitable for running in browsers
    const clientBundleOutputDir = './wwwroot/dist';
    const clientBundleConfig = merge(sharedConfig, {
        entry: { 'main-client': './ClientApp/boot-client.ts' },
        output: { path: path.join(__dirname, clientBundleOutputDir) },
        plugins: [
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./wwwroot/dist/vendor-manifest.json')
            })
        ].concat(isDevBuild ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(clientBundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [
                // Plugins that apply in production builds only
                new webpack.optimize.UglifyJsPlugin()
            ])
    });

    // Configuration for server-side (prerendering) bundle suitable for running in Node
    const serverBundleConfig = merge(sharedConfig, {
        resolve: { mainFields: ['main'] },
        entry: { 'main-server': './ClientApp/boot-server.ts' },
        plugins: [
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./ClientApp/dist/vendor-manifest.json'),
                sourceType: 'commonjs2',
                name: './vendor'
            })
        ],
        output: {
            libraryTarget: 'commonjs',
            path: path.join(__dirname, './ClientApp/dist')
        },
        target: 'node',
        devtool: 'inline-source-map'
    });

    return [clientBundleConfig, serverBundleConfig];
};
