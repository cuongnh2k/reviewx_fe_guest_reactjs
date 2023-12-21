import {Avatar, Flex, Form, Input, Typography, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {useState} from "react";

const {Paragraph} = Typography;
const UpdateAccountComponent = () => {
    const [editableStr, setEditableStr] = useState('This is an editable text.');
    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    return (
        <>
            <Flex
                justify="center"
            >
                <Avatar
                    style={{
                        width: 150,
                        height: 150
                    }}
                    src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2"/>
            </Flex>
            <Flex
                justify="right"
            >
                <Form>
                    <Form.Item
                        name="upload"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload name="logo" action="/upload.do" listType="picture">
                            <UploadOutlined/>
                        </Upload>
                    </Form.Item>
                </Form>
            </Flex>
            <Flex
                justify="center"
            >
                <Paragraph
                    editable={{
                        onChange: setEditableStr,
                    }}
                >
                    {editableStr}
                </Paragraph>
            </Flex>
            <Flex
                justify="center"
            >
                <Paragraph
                    editable={{
                        onChange: setEditableStr,
                    }}
                >
                    {editableStr}
                </Paragraph>
            </Flex>
            <Flex
                justify="center"
            >
                <Input.Password placeholder="input password"/>
            </Flex>
            <Flex
                justify="center"
            >
                <Input.Password placeholder="input password"/>
            </Flex>
        </>
    )
}
export default UpdateAccountComponent