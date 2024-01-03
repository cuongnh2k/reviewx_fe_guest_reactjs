import {Button, Flex, Form, Input, message, Modal} from "antd";
import React, {useEffect, useState} from "react";
import CategoryComponent from "../../../layout/content/affix/CategoryComponent";
import TreeSelectObjectComponent from "./TreeSelectObjectComponent";
import CreateAvatarProposeComponent from "./CreateAvatarProposeComponent";
import UseFetch from "../../../../hooks/UseFetch";
import Api from "../../../../api/Api";
import {useNavigate, useSearchParams} from "react-router-dom";

const CreateProposeComponent = ({onRefresh}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get("categoryId") || ""
    const [data, setData] = useState({loading: false, result: null})
    const [create, setCreate] = useState({name: "", address: "", note: ""})
    const [objectId, setObjectId] = useState("")
    const [avatar, setAvatar] = useState("")

    useEffect(() => {
        if (create.name !== "" && create.address !== "") {
            const fetchAPI = async () => {
                setData(o => ({...o, loading: true}))
                const response = await UseFetch(Api.uObjectsV1POST,
                    "",
                    JSON.stringify({
                        categoryId: categoryId,
                        objectId: objectId,
                        avatar: avatar,
                        name: create.name,
                        address: create.address,
                        note: create.note
                    }))
                const data = await response.json();
                setData(o => ({...o, loading: false}))
                if (data.success) {
                    messageApi.success("Tạo đề xuất thành công")
                    onRefresh()
                } else {
                    if (data.errorCode === 401) {
                        localStorage.removeItem("token")
                        navigate(`/account`)
                    } else if (data.errorCode === 400) {
                        messageApi.error("Danh mục không được để trống")
                    } else {
                        messageApi.error("Tạo đề xuất thất bại")
                    }
                }
            }
            fetchAPI()
        }
    }, [create]);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
        setCreate(o => ({...o, name: values.name, address: values.address, note: values.note}))
    };
    const onFinishFailed = () => {
    };

    const onChangeObject = (value) => {
        setObjectId(value)
    }

    const onChangeAvatar = (value) => {
        setAvatar(value)
    }

    return (
        <Flex
            justify="center"
        >
            <div
                style={{
                    padding: 16,
                    width: "100%",
                    maxWidth: 500
                }}
            >
                {contextHolder}
                <Flex
                    justify="right"
                >
                    <Button onClick={showModal}>Tạo để xuất</Button>
                    <Modal
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={[]}
                    >
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
                            <Form.Item
                                label="Danh mục"
                            >
                                <CategoryComponent/>
                            </Form.Item>

                            <Form.Item
                                label="Đối tượng"
                            >
                                <TreeSelectObjectComponent onChangeObject={onChangeObject}/>
                            </Form.Item>
                            <Form.Item
                                label="Ảnh đại diện"
                            >
                                <CreateAvatarProposeComponent onChangeAvatar={onChangeAvatar}/>
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
                                        Tạo
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </Modal>
                </Flex>
            </div>
        </Flex>
    )
}
export default CreateProposeComponent