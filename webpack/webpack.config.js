const path = require("path");
const { CheckerPlugin } = require('awesome-typescript-loader')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const cleanPlugin = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const chunks = [];
module.exports = {
    mode: "production",
    entry: {
        main:"./src/index.tsx",
        index:"./src/js/index.tsx"
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "../","dist"),
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    optimization: {
        splitChunks: {
           chunks: "all",
           maxAsyncRequests: 4, // 异步加载的最大请求数，适用于按需加载
           maxInitialRequests: 2  // 指的是在 html 中 js（除了index.js） 之外应该引用的 js数量，默认为 3
        },
        runtimeChunk: { // 这时在 dev 环境下的？？？？ 有利于文件缓存
            name: entrypoint => `runtime~${entrypoint.name}`
        }
    },
    // externals: {
    //     react: "React",
    //     "react-dom": "ReactDOM",
    //     "antd": "antd"
    // },
    module: {
        rules: [
            { 
                test: /\.tsx?$/, 
                loader: "awesome-typescript-loader",
                include: [
                    path.resolve(__dirname, "../", "src")
                ],
                exclude: [
                    path.resolve(__dirname, "../", "node_modules")
                ],
             },
            { 
                test: /\.js$/, loader: "source-map-loader", enforce: "pre" },
            {
                test: /\.less$/,
                use: [
                  {
                    loader: 'style-loader', // creates style nodes from JS strings
                  },
                  {
                    loader: MiniCssExtractPlugin.loader, // 提取 css 
                  },
                  {
                    loader: 'css-loader', // translates CSS into CommonJS
                  },
                  {
                    loader: 'less-loader', // compiles Less to CSS
                  },
                ],
              },
        ]
    },
    plugins:[
        new CheckerPlugin(),
        new HtmlWebpackPlugin({
            // title: "all road",  // 页面title
            hash: true, // 给每个文件添加 hsah 值，防止缓存
            templateParameters: {
                js: [ "assets/react.js", "assets/react-dom.js", "assets/moment.min.js", "assets/antd.min.js"],
                title: "all road",
            },
            template: "./assert/index.html",
            // chunks: chunks
        }),
        new MiniCssExtractPlugin({
            filename: 'index.css',
            chunkFilename: '[id].css',
        }),
        // new BundleAnalyzerPlugin(),
        new cleanPlugin() // 在每次构建之前，将会清理 output path 里面的内容
    ]
}