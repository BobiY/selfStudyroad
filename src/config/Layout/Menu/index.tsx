import * as React from "react";
import { Menu } from 'antd';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
const { SubMenu }  = Menu;
class ConmmonMenu extends React.Component<any, any>{
    constructor(props) {
        super(props)
    }
    rootSubmenuKeys = [];
    calSelectKey = {};
    state = {
        openKeys: ['sub1'],
        selectedKeys: []
    };
    componentDidMount() {
        const [ firstKey ] = this.rootSubmenuKeys;
        const [ subFirstKey ] = this.calSelectKey[firstKey];
        const { history: {push} } = this.props;
        if ( subFirstKey ) {
            push(subFirstKey);
        }
        this.setState( {openKeys: [firstKey], selectedKeys: [subFirstKey]});
    }
    renderMenu() {
        const { menuConfig } = this.props;
        return menuConfig.map( item => {
            const tmp = this.rootSubmenuKeys.filter( path => path === item.path );
            if ( tmp.length === 0 ) {
                this.rootSubmenuKeys.push(item.path);
                this.calSelectKey[item.path] = [];
            }
            if ( item.routes ) {
                return <SubMenu
                    key={item.path}
                    title={
                        <span>
                            <span>{item.name}</span>
                        </span>
                    }
                >
                    {item.routes.map( sub => {
                        const tmps = this.calSelectKey[item.path].filter( path => path === sub.path );
                        if ( tmps.length === 0 ) {
                            this.calSelectKey[item.path].push(sub.path);
                        } 
                        return <Menu.Item key={sub.path}>
                                    <Link to={sub.path}>
                                        {sub.name}
                                    </Link>
                                </Menu.Item>
                    } )}
                </SubMenu>
            } else {
                <Menu.Item key={item.path}><Link to={item.path}>{item.name}</Link></Menu.Item>
            }
        } );
    }
    onOpenChange = openKeys => {
        const { history: {push} } = this.props;
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if ( !latestOpenKey ) {
            return false;
        }
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            const [ subFirstKey ] = this.calSelectKey[latestOpenKey];
            this.setState({ openKeys, selectedKeys: [subFirstKey] });
            push(subFirstKey);
        } else {
            const [ subFirstKey ] = this.calSelectKey[latestOpenKey];
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
                selectedKeys: [subFirstKey]
            });
            push(subFirstKey);
        }
    };
    handleClick(item) {
        const { key } = item;
        const { history: {push} } = this.props;
        this.setState({ selectedKeys: [key] });
        push(key);
    }
    render() {
        const { openKeys, selectedKeys } = this.state;
        return(
            <div className="menu-self">
                <Menu 
                    mode="inline"
                    theme="dark"
                    openKeys={openKeys}
                    onOpenChange={this.onOpenChange}
                    selectedKeys={selectedKeys}
                    onClick={this.handleClick.bind(this)}
                >
                    {this.renderMenu()}
                </Menu>
            </div>
        );
    }
}

export default withRouter(ConmmonMenu);