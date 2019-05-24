import * as React from "react";
import * as ReactDOM from "react-dom";


class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>App</div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));