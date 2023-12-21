import {Badge, Menu, theme} from "antd";
import React from "react";
import {BellOutlined, BulbOutlined, FormOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

const MenuComponent = () => {
    const navigate = useNavigate();
    const {
        token: {colorBgContainer},
    } = theme.useToken();
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
                count={1}
                overflowCount={999}
                size="small"
            >
                <BellOutlined
                    style={{
                        color: colorBgContainer,
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