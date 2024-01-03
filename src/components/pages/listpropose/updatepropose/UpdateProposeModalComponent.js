import {Button, Flex, Form, Input, message, Radio} from "antd";
import React, {useEffect, useState} from "react";
import UseFetch from "../../../../hooks/UseFetch";
import Api from "../../../../api/Api";
import {useNavigate} from "react-router-dom";
import CreateAvatarProposeComponent from "../createpropose/CreateAvatarProposeComponent";

const UpdateProposeModalComponent = ({item, onRefresh}) => {
    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate();
    const [data, setData] = useState({loading: false, result: null})
    const [create, setCreate] = useState({status: "", note: ""})
    const [status, setStatus] = useState("")

    useEffect(() => {
        if (create.status !== "") {
            const fetchAPI = async () => {
                setData(o => ({...o, loading: true}))
                const response = await UseFetch(Api.aObjectsV1IdPATCH,
                    `/${item.id}`,
                    JSON.stringify({
                        status: create.status,
                        note: create.note
                    }))
                const data = await response.json();
                setData(o => ({...o, loading: false}))
                if (data.success) {
                    messageApi.success("Sửa đề xuất thành công")
                    onRefresh()
                } else {
                    if (data.errorCode === 401) {
                        localStorage.removeItem("token")
                        navigate(`/account`)
                    } else if (data.errorCode === 400) {
                        messageApi.error("Danh mục không được để trống")
                    } else {
                        messageApi.error("Sửa đề xuất thất bại")
                    }
                }
            }
            fetchAPI()
        }
    }, [create]);
    const onChangeStatus = (e) => {
        setStatus(e.target.value)
    };

    const onFinish = (value) => {
        setCreate(o => ({...o, status: status}))
    };
    const onFinishFailed = () => {
    };

    return (
        <>
            <CreateAvatarProposeComponent url={item.avatar}/>
            <Flex style={{padding: "10px 0"}}>
                {`Tên: ${item.name}`}
            </Flex>
            <Flex style={{padding: "10px 0"}}>
                {`Địa chỉ: ${item.address}`}
            </Flex>

            <Form
                style={{
                    marginTop: 20
                }}
                name="basic"
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    span: 24,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                {contextHolder}
                <Form.Item
                >
                    Trạng thái:
                    <Radio.Group
                        style={{marginLeft: 20}}
                        onChange={onChangeStatus}
                        value={status}
                    >
                        <Radio value={"SUCCESS"}>Thành công</Radio>
                        <Radio value={"REJECT"}>Từ chối</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item>
                    {`Ghi chú của người tạo: `}
                </Form.Item>
                <Form.Item
                    label="Ghi chú của admin:"
                    name="note"
                >
                    <div style={{padding: "8px 16px"}}>
                        <Input.TextArea rows={7}/>
                    </div>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 0,
                        span: 24
                    }}
                >
                    <div
                        style={{
                            margin: "0 auto",
                            width: 53
                        }}
                    >
                        <Button
                            disabled={data.loading}
                            type="primary"
                            htmlType="submit"
                        >
                            Sửa
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </>
    )
}
export default UpdateProposeModalComponent