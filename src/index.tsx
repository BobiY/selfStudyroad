import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button } from "antd";
import Loading from "./css/Loading/Loading";
import { withRouter } from "react-router";
import "./index.less";

class App extends React.Component<any, any> {
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
    componentWillUnmount() { // 跳转到其他路由后更改 页面背景色
        const $bodyEle = document.getElementsByTagName("body")[0];
        $bodyEle.style.background = "#e8e8e8";
    }
    handleClick( type ) {
        const urls = {
            js: "/javascript",
            html: "/html",
            css: "/css"
        }
        this.props.history.push( urls[type] )
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
                                <Button onClick = {this.handleClick.bind(this, "js")}>javascript</Button>
                                <Button onClick = {this.handleClick.bind(this, "html")}>html</Button>
                                <Button onClick = {this.handleClick.bind(this, "css")}>css</Button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default withRouter(App);
