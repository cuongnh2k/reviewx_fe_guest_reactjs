import {Affix, theme} from "antd";
import React from "react";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";

const CollapsedComponent = ({clickCollapsed, collapsed}) => {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    return (
        <Affix
            offsetTop={0}
            onClick={() => clickCollapsed()}
            style={{
                background: colorBgContainer,
            }}
        >
            {collapsed
                ? <MenuUnfoldOutlined
                    style={{
                        fontSize: 20,
                    }}
                />
                : <MenuFoldOutlined
                    style={{
                        fontSize: 20,
                    }}
                />
            }
        </Affix>
    )
}
export default CollapsedComponent