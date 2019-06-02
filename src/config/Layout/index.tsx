import * as React from "react";
import { Layout, Menu, Icon } from 'antd';
import ConmmonMenu from "./Menu/index";
import "./index.less";
const { Header, Sider, Content } = Layout;

export default class LayoutPage extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    state = {
        collapsed: false,
      };
    
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        return (
            <Layout id="components-layout-demo-custom-trigger">
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                <div className="logo">RXJS</div>
                <ConmmonMenu menuConfig={this.props.menuConfig}/>
                </Sider>
                <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                    <Icon
                    className="trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                    />
                </Header>
                <Content
                    style={{
                    margin: '24px 16px',
                    padding: 24,
                    background: '#fff',
                    minHeight: 280,
                    }}
                >
                    Content
                </Content>
                </Layout>
            </Layout>
        )
    }
}