import React, {useState} from "react";
import {Modal, Typography} from "antd";
import UpdateProposeModalComponent from "./UpdateProposeModalComponent";

const {Text, Link} = Typography;
const UpdateProposeUserComponent = ({item, onRefresh}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);

    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <a key="list-loadmore-edit" onClick={showModal}>Sửa</a>
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Xác nhận"
                cancelText="Hủy bỏ"
                footer={[]}
            >
                <UpdateProposeModalComponent item={item} onRefresh={onRefresh}/>
            </Modal>
        </>
    )
}
export default UpdateProposeUserComponent