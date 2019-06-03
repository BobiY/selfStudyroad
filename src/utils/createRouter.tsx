import { renderRoutes  } from "react-router-config";
import * as React from 'react';
import { IRouter } from "../interface/routerInterface";

/**
 *  此次使用了 React 新增的 React.lazy 和 React.Suspense；
 *  React.lazy 用于分割各个路由页面
 *  React.Suspense 用于在渲染出错时提供一个 UI 回退方案
 * import("./xxx") 不能直接使用，应该 配合 React.lazy
 */

const getComponent = WapperComponent => ({ route }): JSX.Element => {
    return <WapperComponent>{renderRoutes(route.routes)}</WapperComponent>
};
const createRouter = (routes: any[]) => { 
    routes.forEach( item => {
        if ( item.routes ) {
            if ( !item.render ) { // 如果用户传递了 render ，说明想自己去定义生成
                item.render = getComponent(React.lazy(item.component));
            }
            createRouter(item.routes)
        } else {
            if(item.component) {
                item.component = React.lazy(item.component);
            }
        }
    } )
    return routes;
}

export const createRouters = (routes: any) => {
    const result = createRouter(routes);
    return (
        <React.Suspense fallback={() => {console.log("error is start.....")}}>
            {renderRoutes(result)}
        </React.Suspense>
    );
};

export const getRoutes = ( routes: any[] ) => {
    const result = [];
    const tmp = routes.map( item => {
        return item.routes;
    } )
    tmp.forEach( item => {
        result.push( ...item );
    } );
    return result;
}