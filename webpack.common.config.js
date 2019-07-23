const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: "./src/index.tsx"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "img": path.resolve(__dirname, "./src/assets/img")
        }
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                loader: "babel-loader!ts-loader"
            },
            // {
            //     test: /\.css$/,
            //     // loader: "css-loader"  
            //     loader: "css-loader"  
            // },
            {
                test: /(\.less|\.css)$/,
                include: /node_modules|antd\.less/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /(\.css)$/,
                include: [
                    path.resolve(__dirname, 'src/assets/css')
                ],
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/public/index.html'
        }),
        // 无视.d.ts
        new webpack.WatchIgnorePlugin([
          /less\.d\.ts$/
        ]),
    ]
}