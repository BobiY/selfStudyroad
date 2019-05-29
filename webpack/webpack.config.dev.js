const path = require("path");
const { CheckerPlugin } = require('awesome-typescript-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/assert/"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    externals: {
        react: "React",
        "react-dom": "ReactDOM"
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
                //   {
                //     loader: MiniCssExtractPlugin.loader,
                //   },
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
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        index: "index.html",
        open: true,  // 启动服务后，打开默认浏览器 目前测试并没什么用
        filename:"bundle.js",
        lazy: true,
    },
    plugins:[
        new CheckerPlugin(),
        new HtmlWebpackPlugin({
            title: "all road",  // 页面title
            hash: true, // 给每个文件添加 hsah 值，防止缓存
            filename: "./index.html",
            template: "./assert/index.html"
        }),
        // new webpack.HotModuleReplacementPlugin(), // 启用模块的热更新 devServer 默认会开启 hot，即使不指定改插件，也会自动添加
        // new MiniCssExtractPlugin({
        //     filename: '[name].css',
        //     chunkFilename: '[id].css',
        // }),
        // new OpenBrowserPlugin({ url: 'http://localhost:8000', browser: "chrome" })
    ]
}