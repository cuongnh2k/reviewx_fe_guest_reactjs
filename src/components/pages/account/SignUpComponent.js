import React, {useState} from 'react';
import {Button, Flex, Form, Input} from 'antd';
import TabComponent from "../../common/TabComponent";
import UseFetch from "../../../api/UseFetch";
import Api from "../../../api/Api";

const SignUpComponent = ({activeKey, onChangeTab, handleRefresh}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [call, setCall] = useState(0)

    const login = UseFetch(Api.bAuthsSignUpPOST, "", JSON.stringify({email: email, password: password}), [call])
    console.log(login)
    if (login && login.success) {
        localStorage.setItem("token", `Bearer ${login.data.token}`)
        handleRefresh()
    }

    const onFinish = (values) => {
        setEmail(values.email)
        setPassword(values.password)
        setCall(Math.random())
        console.log(values)
    };
    const onFinishFailed = (errorInfo) => {
        console.log(errorInfo)
    };
    return (
        <Flex
            justify="center"
        >
            <Form
                name="basic"
                labelCol={{
                    span: 7,
                }}
                wrapperCol={{
                    span: 17,
                }}
                style={{
                    width: "100%",
                    maxWidth: 500,
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
                    label="Tên"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
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
                    label="Xác nhận mật khẩu"
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
                        offset: 10,
                    }}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Gửi
                    </Button>
                </Form.Item>
            </Form>
        </Flex>
    )
}
export default SignUpComponent