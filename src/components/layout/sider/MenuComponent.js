import {Badge, Menu, Space, theme} from "antd";
import React from "react";
import {BellOutlined, BulbOutlined, FormOutlined, UserOutlined} from "@ant-design/icons";

const MenuComponent = () => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    return (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
            <Menu.Item
                key={"1"}
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
                key={"2"}
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
                key={"3"}
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
                key={"4"}
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