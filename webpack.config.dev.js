const path = require("path");
const { CheckerPlugin } = require('awesome-typescript-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const devServer = require("webpack-dev-server");

module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
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
                    loader: MiniCssExtractPlugin.loader,
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
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
    },
    plugins:[
        new CheckerPlugin(),
        new HtmlWebpackPlugin({
            title: "all road",  // 页面title
            hash: true, // 给每个文件添加 hsah 值，防止缓存
            filename: "./index.html",
            template: "./assert/index.html"
        }),
        new webpack.HotModuleReplacementPlugin(), // 启用模块的热更新
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ]
}