import {Card, Col, Empty, Image, Row, Space, Typography} from "antd";

const {Paragraph} = Typography;
const ListObjectComponent = ({listObject}) => {
    return (
        (listObject && listObject.content && listObject.content.length !== 0) ?
            <Row
                style={{
                    margin: "-16px -8px -16px -8px"
                }}
            >
                {listObject.content.map(o =>
                    <Col className="gutter-row" xs={24} sm={12} md={6} lg={4}
                         style={{
                             padding: "30px 8px",
                         }}
                    >
                        <Card
                            style={{
                                width: "100%",
                            }}
                            hoverable
                            cover={<Image
                                width="100%"
                                src={o.avatar}
                            />}
                        >
                            <Paragraph ellipsis={true}>
                                {o.name}
                            </Paragraph>
                            <Paragraph ellipsis={true}>
                                {o.address}
                            </Paragraph>
                        </Card>
                    </Col>
                )
                }
            </Row>
            : <Space
                direction="horizontal"
                style={{
                    width: '100%',
                    justifyContent: 'center'
                }}
            >
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="Không có kết quả"
                />
            </Space>
    )
}
export default ListObjectComponent