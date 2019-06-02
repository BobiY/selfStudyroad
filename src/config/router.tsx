import * as React from "react";
import RedirectCom from "./redirectCom";
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
        component: () => import("../js/react/index")
    },
    {
        path: "/rxjs",
        component: () => import("../js/rxjs/index")
    },
    {
        component: () => import("./404page/404")
    },
];