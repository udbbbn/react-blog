const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.common.config');
const merge = require('webpack-merge');

module.exports = merge(config, {
    devtool: "source-map",
    mode: "development",
    devServer: {
        host: "127.0.0.1",
        port: 8080,
        hot: true,
        inline: true
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                      loader: 'dts-css-modules-loader',
                      options: {
                        namedExport: true,
                      }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // 是否用css module
                            modules: true,
                            // 支持驼峰
                            camelCase: true
                        }
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
})