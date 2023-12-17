import React from 'react';
import {Layout, theme} from 'antd';
import AffixComponent from "./affix/AffixComponent";

const {Content} = Layout;
const ContentComponent = ({children, clickCollapsed, collapsed}) => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    return (
        <Layout>
            <AffixComponent clickCollapsed={clickCollapsed} collapsed={collapsed}/>
            <Content>
                <div
                    style={{
                        padding: 16,
                        minHeight: 360,
                        background: colorBgContainer,
                    }}
                >
                    {children}
                </div>
            </Content>
        </Layout>
    )
}
export default ContentComponent