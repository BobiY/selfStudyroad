import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button } from "antd";
import "./index.less";
// const OtherComponent = React.lazy(() => import("./js/index"));
class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>App...1111</div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));