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
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    plugins:[
        new checkPlugin()
    ]
}