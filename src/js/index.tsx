import * as React from "react";
import { Button, List, Avatar, Card } from "antd";
import IReact from "./react/index";
import { list } from "../config/jsConfig/listConfig";
import { urlRouter } from "../config/jsConfig/jsRouter";
import { withRouter } from "react-router";
import "./index.less";

class Index extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    handleClick(aimType) {
        const { history: {push} } = this.props;
        const aimUrl = urlRouter[aimType];
        console.log(aimUrl, aimType, urlRouter)
        push(aimUrl);
    }
    render() {
        return (
            <div className="javascript-style">
                <Card title="这是我已经会应用，或者正在学习的技术列表">
                    <List
                        itemLayout="horizontal"
                        dataSource={list}
                        renderItem={item => (
                            <List.Item actions={[<a onClick={ this.handleClick.bind(this, item.type) }>继续学习</a>]}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.avatar} />}
                                    title={item.title}
                                    description={item.description}
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            </div>
        )
    }
}

export default withRouter(Index);