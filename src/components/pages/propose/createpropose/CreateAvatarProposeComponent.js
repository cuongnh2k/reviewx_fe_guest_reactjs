import {Avatar, Button, Flex, Modal, Space, Upload} from "antd";
import React, {useState} from "react";
import {UploadOutlined} from "@ant-design/icons";
import Api from "../../../../api/Api";
import {useNavigate} from "react-router-dom";

const CreateAvatarProposeComponent = ({onChangeAvatar, url}) => {
    const [open, setOpen] = useState(false);
    const [avatar, setAvatar] = useState("")
    const navigate = useNavigate();
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
                    onChangeAvatar(info.file.response.data.url)
                } else {
                    localStorage.removeItem("token")
                    navigate("/account")
                }
            }
        },
    };

    return (
        <Flex
            justify="center"
        >
            <Avatar
                style={{
                    width: 150,
                    height: 150,
                    border: "1px solid DarkGrey"
                }}
                src={avatar || url}
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
export default CreateAvatarProposeComponent