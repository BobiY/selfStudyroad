import * as React from "react";
import Layout from "../../config/Layout/index";
import { routes } from "./config/router";
export default class IReact extends React.Component<any, any> {
    constructor(props: any){
        super(props);
    }
    render() {
        return (
            <div>
                <Layout menuConfig={routes} title={"React"}>
                    {this.props.children || null}
                </Layout>
            </div>
        )
    }
}