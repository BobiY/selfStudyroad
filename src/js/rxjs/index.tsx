import * as React from "react";
import LayoutPage from "../../config/Layout/index";
import { routes } from "./config/router";

export default class Rxjs extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>
                {this.props.children || null}
                <LayoutPage menuConfig={routes}/>
            </div>
        )
    }
}