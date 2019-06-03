export const routes = [
    {
        path: "/",
        component: "////",
        name: "Context",
        routes: [
            {
                path: "/react/context",
                component: () => import("../context/index"),
                name: "inter"
            },
        ]
    },
];