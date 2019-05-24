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
const a = [1,2,3].map( item => item );
console.log(a);

ReactDOM.render(<App />, document.getElementById("app"));