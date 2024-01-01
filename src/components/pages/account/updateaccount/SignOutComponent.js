import React, {useState} from "react";
import {Button, Flex, Modal, Typography} from "antd";

const {Text, Link} = Typography;
const SignOutComponent = ({onChangeTab}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        localStorage.removeItem("token")
        onChangeTab("sign-in")
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <Flex
            style={{
                marginTop: 16,
            }}
            justify="center"
        >
            <Button onClick={showModal}>Đăng xuất</Button>
            <Modal
                title="Bạn có chắc muốn đăng xuất không"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={"Đăng xuất"}
                cancelText={"Hủy bỏ"}
            />
        </Flex>
    )
}
export default SignOutComponent