import React from 'react';
import {Layout} from 'antd';
import MenuComponent from "./MenuComponent";

const {Sider} = Layout;

const SiderComponent = ({responseCollapsed, collapsed}) => {
    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="1"
            onBreakpoint={(broken) => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
                responseCollapsed(collapsed)
            }}
            collapsed={collapsed}
        >
            <MenuComponent/>
        </Sider>
    )
}
export default SiderComponent