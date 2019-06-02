import * as React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { paraisoDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default class Highlighter extends React.Component<any, any> { // 用于生成高亮代码块
    constructor(props) {
        super(props)
    }

    render() {
        const { codeString } = this.props;
        return (
            <SyntaxHighlighter language = {"javascript"} style = { paraisoDark } >
                { codeString }
            </SyntaxHighlighter>
       );
    }
}
