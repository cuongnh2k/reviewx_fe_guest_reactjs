import {Badge, Menu} from "antd";
import React, {useEffect, useState} from "react";
import {BellOutlined, BulbOutlined, FormOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import UseFetch from "../../../hooks/UseFetch";
import Api from "../../../api/Api";

const MenuComponent = () => {
    const [data, setData] = useState({loading: false, result: null})
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAPI = async () => {
            setData(o => ({...o, loading: true}))
            const response = await UseFetch(Api.uNotificationsGET,
                `?pageSize=2147483647`)
            const data = await response.json();
            if (data.success) {
                setData(o => ({...o, loading: false, result: data.data}))
            } else {
                // localStorage.removeItem("token")
                // navigate(`/account`)
            }
        }
        fetchAPI()
    }, []);

    const items = [
        {
            label: (<p onClick={() => navigate("/account")}>Tài khoản</p>),
            key: '/account',
            icon: (<UserOutlined onClick={() => navigate("/account")}/>),
        },
        {
            label: (<p onClick={() => navigate("/")}>Đánh giá</p>),
            key: '/',
            icon: (<FormOutlined onClick={() => navigate("/")}/>),
        },
        {
            label: (<p onClick={() => navigate("/propose")}>Đề xuất</p>),
            key: '/propose',
            icon: (<BulbOutlined onClick={() => navigate("/propose")}/>),
        },
        {
            label: (<p onClick={() => navigate("/notify")}>Thông báo</p>),
            key: '/notify',
            icon: (<Badge
                onClick={() => navigate("/notify")}
                count={data.result && data.result.content.filter(o => !o.isRead).length || 0}
                overflowCount={999}
                size="small"
            >
                <BellOutlined
                    style={{
                        fontSize: 20
                    }}
                    size={1}
                />
            </Badge>),
        },
    ]

    return (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[window.location.pathname]} items={items}/>
    )
}
export default MenuComponent