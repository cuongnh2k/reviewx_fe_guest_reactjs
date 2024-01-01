import {Card, Flex, Typography} from "antd";
import React, {useEffect, useState} from "react";
import Api from "../../../../api/Api";
import UpdateAvatarComponent from "./UpdateAvatarComponent";
import UpdatePasswordComponent from "./UpdatePasswordComponent"
import UseFetch from "../../../../hooks/UseFetch";
import UpdateNameComponent from "./UpdateNameComponent";

const {Paragraph, Text} = Typography;
const UpdateAccountComponent = ({onChangeTab, messageApi}) => {
    const [data, setData] = useState({loading: false, result: null})

    useEffect(() => {
            setData(o => ({...o, loading: true}))
            const fetchAPI = async () => {
                const response = await UseFetch(Api.uUsersGET)
                const data = await response.json();
                if (data.success) {
                    setData(o => ({...o, loading: false, result: data.data}))
                } else {
                    localStorage.removeItem("token")
                    onChangeTab("sign-in")
                }
            }
            fetchAPI()
        }, []
    )

    return (
        <Flex
            justify="center"
        >
            <Card
                style={{
                    width: "100%",
                    maxWidth: 500,
                }}
            >

                <UpdateAvatarComponent onChangeTab={onChangeTab} data={data} messageApi={messageApi}/>
                <Flex
                    justify="center"
                    style={{
                        marginTop: 16,
                    }}
                >
                    <Text>{data.result && data.result.local.email}</Text>
                </Flex>
                <UpdateNameComponent onChangeTab={onChangeTab} data={data} messageApi={messageApi}/>
                <UpdatePasswordComponent onChangeTab={onChangeTab} messageApi={messageApi}/>
            </Card>
        </Flex>
    )
}
export default UpdateAccountComponent