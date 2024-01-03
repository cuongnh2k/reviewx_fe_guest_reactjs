import {Avatar, Flex, List} from "antd";
import React from "react";
import DeleteComponent from "./DeleteComponent";

const ListProposeComponent = ({data, onRefresh}) => {
    return (
        <Flex
            style={{
                padding: 16
            }}
            justify="center"
        >
            <List
                style={{
                    width: "100%",
                    maxWidth: 500,
                }}
                size="small"
                bordered
                dataSource={data.result && data.result.content || []}
                renderItem={(item) =>
                    <List.Item
                        // onClick={}
                        key={item.id}
                        actions={[
                            // <UpdateProposeUserComponent item={item} onRefresh={onRefresh}/>,
                            <DeleteComponent item={item} onRefresh={onRefresh}/>
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar style={{width: 48, height: 48}} src={item.local.avatar}/>}
                            title={`${item.local.name}`}
                            // description={new Date(item.updatedAt).toLocaleString()}
                        />
                        {/*{item.address}*/}
                    </List.Item>
                }
            />
        </Flex>
    )
}
export default ListProposeComponent