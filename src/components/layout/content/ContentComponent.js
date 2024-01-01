import React from 'react';
import {Layout, theme} from 'antd';
import AffixComponent from "./affix/AffixComponent";

const {Content} = Layout;
const ContentComponent = ({children, clickCollapsed, collapsed}) => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    return (
        <Layout
            style={{
                background: colorBgContainer
            }}>
            <AffixComponent clickCollapsed={clickCollapsed} collapsed={collapsed}/>
            <Content>
                <div
                    style={{
                        minHeight: 700,
                    }}
                >
                    {children}
                </div>
            </Content>
        </Layout>
    )
}
export default ContentComponent