import {Tabs} from "antd";
import React from "react";

const TabComponent = ({activeKey, onChangeTab}) => {
    return (
        <Tabs
            activeKey={activeKey}
            onChange={activeKey => onChangeTab(activeKey)}
            centered
            items={
                [
                    {
                        label: `Quên mật khẩu`,
                        key: "1",
                    },
                    {
                        label: `Kích hoạt`,
                        key: "2"
                    },
                    {
                        label: `Đăng nhập`,
                        key: "3",
                    },
                    {
                        label: `Đăng ký`,
                        key: "4"
                    },
                ]
            }
            style={{
                marginBottom: 50
            }}
        />
    )
}
export default TabComponent