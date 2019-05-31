import * as React from "react";
import { Button } from "antd";
import IReact from "./react/index";
import "./index.less";
export default class Index extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                <Button>点我吧</Button><IReact />
                {this.props.children || null}
            </div>
        )
    }
}