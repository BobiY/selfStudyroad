import * as React from "react";

export default class ChildrenApi extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="react-childrenApi">
                <h3 className="h3-title">React.Children-API 简介</h3>
                <p>React.Children.map</p>
            </div>
        )
    }
}