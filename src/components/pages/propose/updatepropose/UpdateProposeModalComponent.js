import {Button, Form, Input, message} from "antd";
import React, {useEffect, useState} from "react";
import UseFetch from "../../../../hooks/UseFetch";
import Api from "../../../../api/Api";
import {useNavigate} from "react-router-dom";
import CreateAvatarProposeComponent from "../createpropose/CreateAvatarProposeComponent";

const UpdateProposeModalComponent = ({item, onRefresh}) => {
    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate();
    const [data, setData] = useState({loading: false, result: null})
    const [create, setCreate] = useState({name: "", address: "", note: ""})
    const [avatar, setAvatar] = useState("")

    useEffect(() => {
        if (create.name !== "" && create.address !== "") {
            const fetchAPI = async () => {
                setData(o => ({...o, loading: true}))
                const response = await UseFetch(Api.uObjectsV1IdPATCH,
                    `/${item.id}`,
                    JSON.stringify({
                        avatar: avatar,
                        name: create.name,
                        address: create.address,
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

    const onFinish = (values) => {
        setCreate(o => ({...o, name: values.name, address: values.address, note: values.note}))
    };
    const onFinishFailed = () => {
    };

    const onChangeAvatar = (value) => {
        setAvatar(value)
    }

    return (
        <Form
            style={{
                marginTop: 20
            }}
            name="basic"
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 20,
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
                label="Ảnh đại diện"
            >
                <CreateAvatarProposeComponent onChangeAvatar={onChangeAvatar} url={item.avatar}/>
            </Form.Item>
            <Form.Item
                label="Tên"
                name="name"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập tên"
                    }
                ]}
                initialValue={item.name}
            >
                <div style={{padding: "8px 16px"}}>
                    <Input/>
                </div>
            </Form.Item>
            <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập địa chỉ"
                    }
                ]}
                initialValue={item.address}
            >
                <div style={{padding: "8px 16px"}}>
                    <Input/>
                </div>
            </Form.Item>
            <Form.Item
                label="Ghi chú"
                name="note"
            >
                <div style={{padding: "8px 16px"}}>
                    <Input.TextArea rows={7}/>
                </div>
            </Form.Item>
            <Form.Item
            >
                Ghi chú của admin:
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
    )
}
export default UpdateProposeModalComponent