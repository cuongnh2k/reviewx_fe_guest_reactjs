import React from 'react';
import {Layout, theme} from 'antd';
import CollapsedComponent from "./CollapsedComponent";

const {Content} = Layout;
const ContentComponent = ({children, clickCollapsed, collapsed}) => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    return (
        <Layout>
            <CollapsedComponent clickCollapsed={clickCollapsed} collapsed={collapsed}/>
            <Content>
                <div
                    style={{
                        padding: "0 20px 20px 20px",
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