import {Affix, Flex} from "antd";
import React from "react";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import CategoryComponent from "./CategoryComponent";

const AffixComponent = ({clickCollapsed, collapsed}) => {
    return (
        <Affix
            offsetTop={0}
        >
            <Flex
                onClick={() => clickCollapsed()}
            >
                {collapsed
                    ? <MenuUnfoldOutlined
                        style={{
                            fontSize: 24,
                            width: "100%",
                            background: "white",
                        }}
                    />
                    : <MenuFoldOutlined
                        style={{
                            fontSize: 24,
                            width: "100%",
                            background: "white",
                        }}
                    />
                }
            </Flex>
            <CategoryComponent/>
        </Affix>
    )
}
export default AffixComponent