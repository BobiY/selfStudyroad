import * as React from "react";
import { Button, List, Avatar, Card } from "antd";
import IReact from "./react/index";
import { list } from "../config/jsConfig/listConfig";
import "./index.less";

const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];
export default class Index extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="javascript-style">
                <Card title="这是我已经会应用，或者正在学习的技术列表">
                    <List
                        itemLayout="horizontal"
                        dataSource={list}
                        renderItem={item => (
                            <List.Item actions={[<a>继续学习</a>]}>
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