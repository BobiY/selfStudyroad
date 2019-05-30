import * as React from "react";
import "./loading.less";
export default class Loading extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="loader">
                <div>L</div>
                <div>O</div>
                <div>A</div>
                <div>D</div>
                <div>I</div>
                <div>N</div>
                <div>G</div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
    }
}