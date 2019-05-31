export interface IRouter{
    path?:　string;
    component: () => any;
    routes?: IRouter[];
    render?: (routes: any) => JSX.Element;
}