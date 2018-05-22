// webpack configuration file

const webpack = require('webpack');
const loadDefinitions = require('./build/load-definitions');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

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
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ],
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
    },
    plugins: [
        new webpack.DefinePlugin(loadDefinitions()),
        new VueLoaderPlugin()
    ]
};
