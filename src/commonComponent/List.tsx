import * as React from "react";
import { List, Typography } from "antd";
const { Paragraph } = Typography;

interface IProps{
    list: string[];
}

export default class ListView extends React.Component<IProps, any> {
    constructor(props){
        super(props);
    }

    render() {
        const { list } = this.props;
        return (
            <List
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Paragraph copyable>{item}</Paragraph>
                    </List.Item>
                )}
            />
        )
    }
}