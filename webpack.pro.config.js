const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.common.config');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 分离css
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清空文件夹
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // bundle可视化工具
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 分离css

module.exports = merge(config, {
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "redux": "Redux"
    },
    output: {
        filename: "bundle.[chunkhash].js"
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /(\.less)$/,
                // exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.(less|config|variables|overrides)$/, /node_modules/],
                exclude: [/node_modules/],
                include: [
                    path.resolve(__dirname, 'src')
                ],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
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
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png|gif|bmp|jpeg)$/,
                loader: 'url-loader',
                options: {
                    limit:8192,//限制打包图片的大小：
                    //如果大于或等于8192Byte，则按照相应的文件名和路径打包图片；如果小于8192Byte，则将图片转成base64格式的字符串。
                    name:'assets/img/[name]-[hash:8].[ext]',//img:图片打包的文件夹；
                    //[name].[ext]：设定图片按照本来的文件名和扩展名打包，不用进行额外编码
                    //[hash:8]：一个项目中如果两个文件夹中的图片重名，打包图片就会被覆盖，加上hash值的前八位作为图片名，可以避免重名。
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
                root: path.resolve(__dirname, 'dist'),
                exclude: ['assets'],
                dry: false // 启用删除文件
        }),
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: "[name].[hash].css",
          chunkFilename: "[id].[hash].css"
        }),
        new HtmlWebpackPlugin({
            inject: 'body',
            template: __dirname + '/public/index.html',
            filename: "index.html",
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
        }),
        // bundle 可视化工具
        new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerHost: '127.0.0.1',
            analyzerPort: 8889,
            reportFilename: 'report.html',
            defaultSizes: 'parsed',
            openAnalyzer: true,
            generateStatsFile: false,
            statsFilename: 'stats.json',
            statsOptions: null,
            logLevel: 'info'
        }),
    ],
    // 提取公共模块
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        },
    }
})
