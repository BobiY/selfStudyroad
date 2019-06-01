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

];