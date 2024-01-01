import {Button, Flex, Form, Input, message, Rate} from "antd";
import React, {useEffect, useState} from "react";
import {SendOutlined} from "@ant-design/icons";
import UseFetch from "../../../../../hooks/UseFetch";
import Api from "../../../../../api/Api";
import {useNavigate} from "react-router-dom";

const FormReviewComponent = ({objectId, onRefresh}) => {
    const [review, setReview] = useState({rate: 1, content: ""})
    const [messageApi, contextHolder] = message.useMessage()
    // const token = localStorage.getItem("token")
    const navigate = useNavigate();
    // let sub = "";
    // try {
    //     sub = JSON.parse(atob(token.split('.')[1])).sub
    // } catch (o) {
    // }
    // let rate = 0.0, content = ""
    // listReview.result && listReview.result.content.map(o => {
    //     if (o.createdBy.id === sub) {
    //         rate = o.rate
    //         content = o.content
    //     }
    // })

    useEffect(() => {
            if (review.rate !== 1 && review.content !== "") {
                const fetchAPI = async () => {
                    const response = await UseFetch(Api.uReviewsPOST, "", JSON.stringify({
                        rate: review.rate,
                        content: review.content,
                        objectId: objectId
                    }))
                    const data = await response.json();
                    if (data.success) {
                        messageApi.success("Cập nhật đánh giá thành công")
                        onRefresh()
                    } else {
                        if (data.errorCode === 401) {
                            localStorage.removeItem("token")
                            navigate(`/account`)
                        } else {
                            messageApi.error("Cập nhật đánh giá thất bại")
                        }
                    }
                }
                fetchAPI()
            }
        },
        [review]
    )

    const onChangeRate = (e) => {
        setReview(o => ({...o, rate: e}))
        console.log(review)
    }

    const onFinish = (values) => {
        setReview(o => ({...o, content: values.content}))
    };
    const onFinishFailed = () => {
    };
    return (
        <Form
            style={{
                marginTop: 20
            }}
            name="basic"
            labelCol={{
                span: 0,
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
                name="content"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập nội dung đánh giá',
                    },
                ]}
                // initialValue={content}
            >
                <Input.TextArea rows={7}/>
            </Form.Item>
            <Form.Item
                style={{
                    marginTop: -20
                }}
                wrapperCol={{
                    offset: 0,
                    span: 24
                }}
            >
                <Flex
                >
                    <Rate
                        style={{
                            width: "100%",
                            fontSize: 28
                        }}
                        allowHalf
                        value={review.rate}
                        onChange={v => onChangeRate(v)}
                    />
                    <Button
                        style={{
                            width: 45
                        }}
                        type="text"
                        htmlType="submit"
                    >
                        <SendOutlined
                            style={{
                                fontSize: 28,
                                margin: 0,
                                padding: 0
                            }}
                        />
                    </Button>
                </Flex>
            </Form.Item>
        </Form>
    )
}
export default FormReviewComponent