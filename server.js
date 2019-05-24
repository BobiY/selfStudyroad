const webpack = require("webpack");
const option = require("./webpack.config.dev");
const DevServer = require("webpack-dev-server");


const compier = webpack(option);
const listen = new DevServer(compier);
listen.listen(8000, () => { console.log("start...") })