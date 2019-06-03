import * as React from "react";
import RedirectCom from "./redirectCom";
import * as routers from "../js/react/config/router";
import { getRoutes } from "../utils/createRouter";
export const routes = [
    {
        path: "/app",
        component: () => import("../index"),
    },
    {
        path: "/javascript",
        component: () => import("../js/index")
    },
    {
        path: "/react",
        component: () => import("../js/react/index"),
        routes: getRoutes(routers.routes)
    },
    {
        path: "/rxjs",
        component: () => import("../js/rxjs/index")
    },
    {
        component: () => import("./404page/404")
    },
];