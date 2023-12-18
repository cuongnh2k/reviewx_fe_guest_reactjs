import React from 'react';
import {Divider, List} from 'antd';
import LayoutComponent from "../../layout/LayoutComponent";
import PaginationComponent from "../../common/PaginationComponent";
import UseFetch from "../../../api/UseFetch";
import Api from "../../../api/Api";

const NotifyPage = () => {

    let listNotify = UseFetch(Api.uNotificationsGET)

    return (
        <LayoutComponent>
            <Divider/>
            <List
                itemLayout="horizontal"
                dataSource={listNotify && listNotify.data.content.map(o => o.content)}
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            title={<a href="https://ant.design">{item.title}</a>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                    </List.Item>
                )}
            />
            <Divider/>
            <PaginationComponent/>
        </LayoutComponent>
    )
}
export default NotifyPage