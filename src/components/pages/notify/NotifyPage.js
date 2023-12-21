import React, {useState} from 'react';
import {Divider, List} from 'antd';
import LayoutComponent from "../../layout/LayoutComponent";
import PaginationComponent from "../../common/PaginationComponent";
import UseFetch from "../../../api/UseFetch";
import Api from "../../../api/Api";

const NotifyPage = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const listData = UseFetch(Api.uNotificationsGET, `?pageNumber=${page - 1}&pageSize=${pageSize}`, null, [page, pageSize])

    const onChange = (page, pageSize) => {
        setPage(page)
        setPageSize(pageSize)
    }

    return (
        <LayoutComponent>
            <Divider/>
            <List
                size="small"
                itemLayout="horizontal"
                dataSource={listData && listData.data.content || []}
                renderItem={(item, index) => (
                    <List.Item
                        style={{
                            background: item.isRead ? "while" : "Gainsboro",
                        }}
                    >
                        {item.content}
                    </List.Item>
                )}
            />
            <Divider/>
            <PaginationComponent listObject={listData} onChange={onChange}/>
        </LayoutComponent>
    )
}
export default NotifyPage