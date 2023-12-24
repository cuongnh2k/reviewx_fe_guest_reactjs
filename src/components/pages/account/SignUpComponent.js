import React, {useEffect, useState} from 'react';
import {Button, Card, Flex, Form, Input, message} from 'antd';
import TabComponent from "../../common/TabComponent";
import UseFetch from "../../../hooks/UseFetch";
import Api from "../../../api/Api";

const SignUpComponent = ({activeKey, onChangeTab}) => {
    const [data, setData] = useState({loading: false, result: null})
    const [login, setLogin] = useState({email: "", password: ""})
    const [messageApi, contextHolder] = message.useMessage()

    useEffect(() => {
            if (login.email !== "" && login.password !== "") {
                setData(o => ({...o, loading: true}))
                const fetchAPI = async () => {
                    const response = await UseFetch(Api.bAuthsSignInPOST,
                        "",
                        JSON.stringify({
                            email: login.email,
                            password: login.password
                        }))
                    const data = await response.json();
                    setData(o => ({...o, loading: false}))
                    if (data.success) {
                        localStorage.setItem("token", `Bearer ${data.data.token}`)
                        messageApi.open({
                            type: 'success',
                            content: 'Đăng nhập thành công',
                            duration: 1,
                        });
                        setTimeout(null, 1000);
                        window.location.reload(true);
                    } else {
                        messageApi.open({
                            type: 'error',
                            content: 'Đăng nhập thất bại',
                            duration: 1,
                        });
                    }
                }
                fetchAPI()
            }
        }, [login]
    )

    const onFinish = (values) => {
        setLogin({email: values.email, password: values.password})
    };
    const onFinishFailed = () => {
    };
    return (
        <Flex
            justify="center"
        >
            {contextHolder}
            <Card
                style={{
                    width: "100%",
                    maxWidth: 500,
                }}
            >
                <Form
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
                    <TabComponent onChangeTab={onChangeTab} activeKey={activeKey}/>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập đúng định dạng email',
                                type: "email"
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Mật khẩu từ 8-16 ký tự. Chứa ít nhất 1 ký tự in hoa, 1 ký tự thường, 1 ký tự số, 1 ký tự ặc biệt',
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W])[A-Za-z\d\W]{8,16}$/
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 11,
                        }}
                    >
                        <Button
                            disabled={data.loading}
                            type="primary"
                            htmlType="submit"
                        >
                            Gửi
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Flex>
    )
}
export default SignUpComponent