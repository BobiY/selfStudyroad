export const definedContext = `
    import *　as React from "react";
    const SelfContext = React.createContext(/* some initValue */);
`;

export const definedProvider = `
    import * as React form "react";
    export const { Provider, Consumer } = React.createContext({theme: {color: "#333"}});

    class App extends React.Component {
        state = {
            theme: "dark"
        }
        handleTheme() {
            const { theme } = this.state;
            if ( theme === "dark" ) {
                this.setState({
                    theme: "light"
                })
            } else {
                this.setState({
                    theme: "dark"
                })
            }
        }
        render() {
            const { theme } = this.state;
            const style = theme === "dark" ? { color: "#333" } : { color: "red" }
            return (
                <div>
                    <button>切换主题</button>
                    <span>当前主题{theme}</span>
                    <Provider value={theme: style}>
                        {this.props.children || null}
                    </Provider>
                </div>
            )
        }
    }
`;

export const definedConsumer = `
    import { Consumer } form "./app";
    import * as React form "react";

    export default class ThemeBtn extends React.Compponent{
        render() {
            return (
                <Consumer>
                    {
                        value => {  // 这里的 value 与  Provider 组件的 value 属性相同
                            const { theme } = value;
                            return <button style={theme}>这是的文字额可以切换字体颜色</button>
                        }
                    }
                </Consumer>
            )
        }
    }
`;