import * as React from "react";
import Highlighter from "../../../config/highlighter/index";
import { 
    definedContext,
    definedProvider,
    definedConsumer
 } from "./codeStr";
import "./index.less";
export default class Context extends React.Component<any, any> {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="react-context">
                <h3>React.Context</h3>
                <div className="inter">
                    <p>先来简单的了解下 React.Context</p>
                    <p>React.Context 是 React 提供的可以全局传递值的 API，通过这个 API，可以直接跨域组件层级的限制，进行无障碍传值。</p>
                    <p>但是并不提倡在日常开发中使用，因为这会导致应用变得不稳定，各种交叉的 React.Context 会导致引用变得及难维护，因为你不知道哪个属性来自于哪个 Context。</p>
                    <p>现在的主流 react 相关工具库已经开始使用这个 API，所以，对其进行简单的了解，有助于我们理解工具和更好的分析工具的源码以便更灵活的使用。</p>
                    <p>如果你是以复用性为前提开发组件的话，这个 API 尽量避免使用。</p>
                </div>
                <div className="use">
                    <p>下面是关于使用的介绍</p>
                    <Highlighter codeString={definedContext}/>
                    <p>上面是怎样获得一个 Context, 接受的参数是初始化传递的值，这个值将会传递给所有订阅了此 Context 的子组件。</p>
                    <p>可以将 Conetxt 理解为 React 提供的一个订阅和广播机制，通过这个机制，就可以实现无层级的数据传递。</p>
                    <p>下面是一个简单示例。</p>
                    <Highlighter codeString={definedProvider} lan={"jsx"}/>
                    <p>上面的是一个 Provider 简单定义，如果熟悉 Redux，对这个名字应该不陌生，他的作用就是将 value 给分发出去，然后当下层组件订阅时，就可以获取传递的 value </p>
                    <p>下面是 Consumer 的使用。</p>
                    <Highlighter codeString={definedConsumer} lan={"jsx"}/>
                    <p> Consumer 的子元素是一个函数组件，参数是离它层级最近的 Provider 传递的 value ( 当然 Provider 和 Consumer 应该来自于同一个 createContext ),如果没有 Provider， 将会使用默认值。 </p>
                </div>
            </div>
        )
    }
}