const webpack = require("webpack");
const option = require("./webpack/webpack.config.dev");
const DevServer = require("webpack-dev-server");


const compier = webpack(option);
const listen = new DevServer(compier);
listen.listen(8000, "localhost",() => { console.log("the server is starting...") })
// listen.close(() => {console.log("server is closing...")})