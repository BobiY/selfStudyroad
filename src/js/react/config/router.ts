export const routes = [
    {
        path: "/",
        component: "////",
        name: "Context",
        routes: [
            {
                path: "/react/context",
                component: () => import("../context/index"),
                name: "介绍"
            },
        ]
    },
    {
        path: "/children",
        component: "////",
        name: "Children",
        routes: [
            {
                path: "/react/children",
                component: () => import("../children/Children"),
                name: "React.Children 介绍"
            },
            {
                path: "/react/childrenApi",
                component: () => import("../children/ChildrenApi"),
                name: "React.ChildrenApi 介绍"
            },
        ]
    },
];