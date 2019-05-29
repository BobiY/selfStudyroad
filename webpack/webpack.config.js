const path = require("path");
const { CheckerPlugin } = require('awesome-typescript-loader')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode: "production",
    entry: "./src/index.tsx",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "../","dist"),
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    optimization: {
        splitChunks: {
          chunks: 'all',
        }
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
                    loader: 'style-loader', // creates style nodes from JS strings
                  },
                  {
                    loader: MiniCssExtractPlugin.loader,
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
                js: [ "assets/react.js", "assets/react-dom.js"],
                title: "all road"
            },
            template: "./assert/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: 'index.css',
            chunkFilename: '[id].css',
        }),
    ]
}