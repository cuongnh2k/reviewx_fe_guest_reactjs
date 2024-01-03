import React, {useEffect, useState} from 'react';
import {Divider, Flex, List, Typography} from 'antd';
import LayoutComponent from "../../layout/LayoutComponent";
import PaginationComponent from "../../common/PaginationComponent";
import UseFetch from "../../../hooks/UseFetch";
import Api from "../../../api/Api";
import {useNavigate} from "react-router-dom";

const {Text} = Typography;
const NotifyPage = () => {
    const [data, setData] = useState({loading: false, result: null})
    const [search, setSearch] = useState({name: "", pageNumber: 1, pageSize: 10});
    const [refresh, setRefresh] = useState(Math.random)
    const [read, setRead] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAPI = async () => {
            setData(o => ({...o, loading: true}))
            const response = await UseFetch(Api.uNotificationsGET,
                `?pageNumber=${search.pageNumber - 1}&pageSize=${search.pageSize}`)
            const data = await response.json();
            if (data.success) {
                setData(o => ({...o, loading: false, result: data.data}))
            } else {
                localStorage.removeItem("token")
                navigate(`/account`)
            }
        }
        fetchAPI()
    }, [search, refresh]);

    useEffect(() => {
        if (read !== "") {
            const fetchAPI = async () => {
                // setData(o => ({...o, loading: true}))
                const response = await UseFetch(Api.uNotificationsIdPUT,
                    `/${read}`)
                const data = await response.json();
                if (data.success) {
                    setRefresh(Math.random)
                    // setData(o => ({...o, loading: false, result: data.data}))
                } else {
                    localStorage.removeItem("token")
                    navigate(`/account`)
                }
            }
            fetchAPI()
        }
    }, [read]);

    const onChange = (page, pageSize) => {
        setSearch(o => ({...o, pageNumber: page, pageSize: pageSize}))
    }

    window.addEventListener('load', function () {
        // Your document is loaded.
        var fetchInterval = 3000; // 5 seconds.

        // Invoke the request every 5 seconds.
        setInterval(() => setRefresh(Math.random), fetchInterval);
    });

    return (
        <LayoutComponent>
            <Divider/>
            <Flex
                style={{
                    marginBottom: 20,
                    padding: 16
                }}
                justify="center"
            >
                <List
                    style={{
                        width: "100%",
                        maxWidth: 500
                    }}
                    size="small"
                    bordered
                    dataSource={data.result && data.result.content || []}
                    renderItem={(item) =>
                        <List.Item
                            onClick={() => setRead(item.id)}
                            key={item.id}
                            style={!item.isRead ? {background: "Gainsboro"} : {background: "white"}}
                        >
                            <List.Item.Meta
                                title={item.content}
                                description={new Date(item.updatedAt).toLocaleString()}
                            />
                        </List.Item>
                    }
                />
            </Flex>
            <PaginationComponent
                data={data}
                onChange={onChange}
            />
            <div style={{marginBottom: 20}}></div>
        </LayoutComponent>
    )
}
export default NotifyPage