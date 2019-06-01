import * as React from "react";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";

class RedirectCom extends React.Component <any,any> { // 将  / 重定向到 /app
    constructor(props) {
        super(props);
    }

    render() {
        const { location: {pathname} } = this.props;
        return (
            <div>
                { pathname === "/" ? <Redirect to={"/app"}/> : this.props.children }
            </div>
        )
    }
}

export default  withRouter(RedirectCom)