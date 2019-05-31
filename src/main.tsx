import * as React from "react";
import * as ReactDom from "react-dom";
import { createRouters } from "./utils/createRouter";
import { HashRouter } from "react-router-dom";
import { routes } from "./config/router";


ReactDom.render(
    <HashRouter>
        {createRouters(routes)}
    </HashRouter>,
    document.getElementById("app")
)