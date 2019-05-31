import * as React from "react";
import * as ReactDom from "react-dom";
import { createRouters } from "./utils/createRouter";
import { HashRouter } from "react-router-dom";


const routes = [
    {
        path: "/javascript",
        component: () => import("./js/index")
    },
    {
        component: () => import("./index"),
    },
];

ReactDom.render(
    <HashRouter>
        {createRouters(routes)}
    </HashRouter>,
    document.getElementById("app")
)