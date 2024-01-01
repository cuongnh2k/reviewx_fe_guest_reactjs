import {Avatar, Button, Flex, Modal, Space, Upload} from "antd";
import React, {useEffect, useState} from "react";
import {UploadOutlined} from "@ant-design/icons";
import Api from "../../../../api/Api";
import UseFetch from "../../../../hooks/UseFetch";

const UpdatePasswordComponent = ({onChangeTab, data, messageApi}) => {

    const [open, setOpen] = useState(false);
    const [avatar, setAvatar] = useState("")
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const props = {
        name: 'file',
        action: `${process.env.REACT_APP_HOST}${Api.uFilesPOST.path}`,
        headers: {
            "Api-Key": process.env.REACT_APP_API_KEY,
            "Authorization": localStorage.getItem("token")
        },
        onChange(info) {
            if (info.fileList.length > 1) {
                info.fileList.shift()
            }
            console.log(info.file)
            if (info.file.status === 'done') {
                if (info.file.response.success) {
                    setAvatar(info.file.response.data.url)
                    console.log(avatar)
                } else {
                    localStorage.removeItem("token")
                    onChangeTab("sign-in")
                }
            }
        },
    };

    useEffect(() => {
            if (avatar !== "") {
                const fetchAPI = async () => {
                    const response = await UseFetch(Api.uUsersPATCH, "", JSON.stringify({avatar: avatar}))
                    const data = await response.json();
                    if (data.success) {
                        messageApi.success("Cập nhật ảnh đại diện thành công")
                    } else {
                        messageApi.error("Cập nhật ảnh đại diện thất bại")
                        localStorage.removeItem("token")
                        onChangeTab("sign-in")
                    }
                }
                fetchAPI()
            }
        },
        [avatar]
    )

    return (
        <Flex justify="center">
            <Avatar
                style={{
                    width: 150,
                    height: 150,
                    border: "1px solid DarkGrey"
                }}
                src={avatar === "" ? (data.result && data.result.local.avatar) : avatar}
            />
            <Space align={"end"}>
                <UploadOutlined onClick={showModal}/>
                <Modal
                    open={open}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[]}
                >
                    <Upload {...props}>
                        <Button>
                            <UploadOutlined/> Tải ảnh lên
                        </Button>
                    </Upload>,
                </Modal>
            </Space>
        </Flex>
    )
}
export default UpdatePasswordComponent