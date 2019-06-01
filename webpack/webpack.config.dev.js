const path = require("path");
const { CheckerPlugin } = require('awesome-typescript-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
    mode: "development",
    entry: "./src/main.tsx",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        // publicPath: "/assert/"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    externals: {
        react: "React",
        "react-dom": "ReactDOM",
        "antd": "antd"
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { test: /\.js$/, loader: "source-map-loader", enforce: "pre" },
            {
                test: /\.less$/,
                use: [
                  {
                    loader: 'style-loader',
                  },
                  {
                    loader: 'css-loader',
                  },
                  {
                    loader: 'less-loader',
                    options: {
                        modifyVars: { }, // 配置 antd 的主题样式
                        javascriptEnabled: true,
                    },
                  },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 100000,
                    name: 'images/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        index: "index.html",
        open: true,  // 启动服务后，打开默认浏览器 目前测试并没什么用
        filename:"bundle.js",
        lazy: true,
        openPage: '/app'
    },
    plugins:[
        new CheckerPlugin(),
        new HtmlWebpackPlugin({
            hash: true, // 给每个文件添加 hsah 值，防止缓存
            filename: "./index.html",
            template: "./asset/index.html",
            templateParameters: {
                js: [ "/asset/react.js", "/asset/react-dom.js", "/asset/moment.min.js", "/asset/antd.min.js"],
                title: "all road",
                css: ["asset/antd.css"]
            },
        }),
        new CopyPlugin([
            { from: path.resolve(__dirname, "../", 'asset/**'), to:  path.resolve(__dirname, "../", 'dist/') },
        ]),
        // new webpack.HotModuleReplacementPlugin(), // 启用模块的热更新 devServer 默认会开启 hot，即使不指定改插件，也会自动添加
        // new MiniCssExtractPlugin({
        //     filename: '[name].css',
        //     chunkFilename: '[id].css',
        // }),
        // new OpenBrowserPlugin({ url: 'http://localhost:8000', browser: "chrome" })
    ]
}