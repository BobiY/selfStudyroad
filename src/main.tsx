import * as React from "react";
import * as ReactDom from "react-dom";
import { createRouters } from "./utils/createRouter";
import { HashRouter } from "react-router-dom";
import { routes } from "./config/router";
import RedirectCom from "./config/redirectCom";

ReactDom.render(
    <HashRouter>
        <RedirectCom>
            {createRouters(routes)}
        </RedirectCom>
    </HashRouter>,
    document.getElementById("app")
)