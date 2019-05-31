
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