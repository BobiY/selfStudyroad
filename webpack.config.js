const path = require("path");
const checkPlugin = require("awesome-typescript-loader").checkPlugin;
module.exports = {
    entry: "src/index.js",
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
            { test: /\.js$/, loader: "source-map-loader", enforce: "pre" }
        ]
    },
    plugins:[
        new checkPlugin()
    ]
}