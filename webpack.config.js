// webpack configuration file

const webpack = require('webpack');
const loadDefinitions = require('./build/load-definitions');

module.exports = {
    entry: ["./src/entry.ts"],
    output: {
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            }
        ],
        loaders: [
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        port: 57237,
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                pathRewrite: {"^/api": ""}
            }
        },
        // Force the dev server to serve the index XHTML page
        historyApiFallback: {
            index: 'index.xhtml'
        }
    },
    plugins: [
        new webpack.DefinePlugin(loadDefinitions())
    ]
};
