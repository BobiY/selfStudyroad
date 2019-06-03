import * as React from "react";
import { Layout, Menu, BackTop } from 'antd';
import ConmmonMenu from "./Menu/index";
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import "./index.less";
const { Header, Sider, Content } = Layout;

export default class LayoutPage extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    state = {
        collapsed: false,
    };
    
    render() {
        const { title } = this.props;
        return (
            <LocaleProvider  locale={zh_CN}>
                <Layout id="components-layout-demo-custom-trigger">
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo">{title}</div>
                    <ConmmonMenu menuConfig={this.props.menuConfig}/>
                    </Sider>
                    <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                    </Header>
                    <Content
                        style={{
                        margin: '24px 16px',
                        padding: 24,
                        background: '#fff',
                        minHeight: 280,
                        }}
                    >
                        {this.props.children || null}
                    </Content>
                    </Layout>
                    <BackTop />
                </Layout>
            </LocaleProvider>
        )
    }
}