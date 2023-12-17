import {Badge, Menu, Space, theme} from "antd";
import React from "react";
import {BellOutlined, BulbOutlined, FormOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

const MenuComponent = () => {
    const navigate = useNavigate();
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    return (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[window.location.pathname]}>
            <Menu.Item
                key={"/account"}
                onClick={() => navigate("/account")}
            >
                <UserOutlined
                    style={{
                        fontSize: 20
                    }}
                />
                <Space
                    style={{
                        marginLeft: 10
                    }}
                >
                    Tài khoản
                </Space>
            </Menu.Item>
            <Menu.Item
                key={"/"}
                onClick={() => navigate("/")}
            >
                <FormOutlined
                    style={{
                        fontSize: 20
                    }}
                />
                <Space
                    style={{
                        marginLeft: 10
                    }}
                >
                    Đánh giá
                </Space>
            </Menu.Item>
            <Menu.Item
                key={"/propose"}
                onClick={() => navigate("/propose")}
            >
                <BulbOutlined
                    style={{
                        fontSize: 20
                    }}
                />
                <Space
                    style={{
                        marginLeft: 10
                    }}
                >
                    Đề xuất
                </Space>
            </Menu.Item>
            <Menu.Item
                key={"/notify"}
                onClick={() => navigate("/notify")}
            >
                <Badge
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
                </Badge>
                <Space
                    style={{
                        marginLeft: 10
                    }}
                >
                    Thông báo
                </Space>
            </Menu.Item>
        </Menu>
    )
}
export default MenuComponent