import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button } from "antd";
import Loading from "./css/Loading/Loading";
import "./index.less";
import { createRouter, aa, createRouters  } from "./utils/createRouter";


export default class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            loading: true
        }
    }
    componentDidMount() {
        setTimeout( () => {
            this.setState({loading: false})
        },2500 );
    }
    render() {
        const { loading } = this.state;
        return (
            <div className="app">
                {
                    loading ? <Loading /> :
                    <div>
                        <header>这里是我的自学记录营地</header>
                        <div className="content">
                            <div className="btn-wapper">
                                <Button>javascript</Button>
                                <Button>html</Button>
                                <Button>css</Button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));