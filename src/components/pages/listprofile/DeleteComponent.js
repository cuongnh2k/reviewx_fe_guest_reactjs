import React, {useEffect, useState} from "react";
import {message, Modal, Typography} from "antd";
import UseFetch from "../../../hooks/UseFetch";
import Api from "../../../api/Api";
import {useNavigate} from "react-router-dom";

const {Text, Link} = Typography;
const DeleteProposeComponent = ({item, onRefresh}) => {
    const navigate = useNavigate();
    const [status, setStatus] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage()

    useEffect(() => {
        if (status !== "") {
            const fetchAPI = async () => {
                // setData(o => ({...o, loading: true}))
                const response = await UseFetch(Api.aUsersDELETE,
                    `/${item.id}`,
                )
                const data = await response.json();
                // setData(o => ({...o, loading: false}))
                if (data.success) {
                    messageApi.success("Xóa thành công")
                    onRefresh()
                } else {
                    if (data.errorCode === 401) {
                        localStorage.removeItem("token")
                        navigate(`/account`)
                    } else {
                        messageApi.error("Xóa thất bại")
                    }
                }
            }
            fetchAPI()
        }
    }, [status]);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setStatus("CANCEL")
        setIsModalOpen(false);

    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <a key="list-loadmore-more" style={{color: "red"}} onClick={showModal}>Xóa</a>
            {contextHolder}
            <Modal
                title={<div>
                    <Text>Bạn có muốn xóa</Text> <Text mark>{item.local.name}</Text> <Text> không?</Text>
                </div>}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Xác nhận"
                cancelText="Hủy bỏ"
            >
            </Modal>
        </>
    )
}
export default DeleteProposeComponent