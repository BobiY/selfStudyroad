import { renderRoutes  } from "react-router-config";
import * as React from 'react';
import { IRouter } from "../interface/routerInterface";
export const aa = [
    {
        component: props => <div>1111{props.children}</div>,
        routes: [
            {
                component: props => <div>22222{props.children}</div>,
                path: "/222",
                routes: [
                    {
                        component: () => <div>3333</div>
                    }
                ],
            },
            {
                component: () =><div>22222111111</div>,
                path: "/222111",
                routes: [
                    {
                        component: () => <div>333333311111111</div>
                    }
                ],
            }
        ]
    }
];


const getComponent = WapperComponent => ({ route }): JSX.Element => {
    return <WapperComponent>{renderRoutes(route.routes)}</WapperComponent>
};
export const createRouter = (routes: any[]) => { 
    routes.forEach( item => {
        if ( item.routes ) {
            if ( !item.render ) { // 如果用户传递了 render ，说明想自己去定义生成
                item.render = getComponent(React.lazy(item.component));
            }
            createRouter(item.routes)
        } else {
            item.component = React.lazy(item.component);
        }
    } )
    return routes;
}

export const createRouters = (routes: any) => {
    const result = createRouter(routes);
    return <React.Suspense fallback={() => {console.log("error is start.....")}}>{renderRoutes(result)}</React.Suspense>
}
