import React, {useState} from 'react';
import {Divider, List} from 'antd';
import LayoutComponent from "../../layout/LayoutComponent";
import PaginationComponent from "../../common/PaginationComponent";
import UseFetch from "../../../hooks/UseFetch";
import Api from "../../../api/Api";

const NotifyPage = () => {
    // const [page, setPage] = useState(1);
    // const [pageSize, setPageSize] = useState(10);
    //
    // const {
    //     loading,
    //     resultCallApi
    // } = UseFetch(Api.uNotificationsGET, `?pageNumber=${page - 1}&pageSize=${pageSize}`, null, [page, pageSize])
    //
    // const onChange = (page, pageSize) => {
    //     setPage(page)
    //     setPageSize(pageSize)
    // }
    //
    // return (
    //     <LayoutComponent>
    //         <Divider/>
    //         <List
    //             size="small"
    //             itemLayout="horizontal"
    //             dataSource={resultCallApi && resultCallApi.data.content || []}
    //             renderItem={(item, index) => (
    //                 <List.Item
    //                     style={{
    //                         background: item.isRead ? "while" : "Gainsboro",
    //                     }}
    //                 >
    //                     {item.content}
    //                 </List.Item>
    //             )}
    //         />
    //         <Divider/>
    //         <PaginationComponent resultCallApi={resultCallApi} onChange={onChange}/>
    //     </LayoutComponent>
    // )
}
export default NotifyPage