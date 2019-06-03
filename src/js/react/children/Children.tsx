import * as React from "react";
import List from "../../../commonComponent/List";
import "./index.less";
export default class Children extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="react-children">
                <h3 className="h3-title">React.Children 简介</h3>
                <div className="inter">
                    <p>React.Children 是 React 提供的顶层 API 之一，只要用于操作来自 this.props.children。</p>
                    <p>this.props.children 是 React 自动添加的 props 属性，它将储存组件开始和结束标签之间的元素。</p>
                    <p> this.props.children 的元素类型主要有三种形式，所以不能用常规的方法去操作。</p>
                    <p>React.Children 提供了用于处理 this.props.children 不透明数据结构的实用方法。</p>
                </div>
                <p>下面是 this.props.children 可能数据类型：</p>
                <List list={[
                        "1. undefined 这种情况存于当开始和结束标签之间没有包括子元素时。", 
                        "2. object 这种情况存在于当开始和结束标签只存在一个子元素时。",
                        "3. array 这种情况存在于当开始和结束标签之间存在的子元素大于一个时。"]}
                />
            </div>
        )
    }
}