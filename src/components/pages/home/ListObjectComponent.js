import {Card, Col, Empty, Image, Row, Space, Typography} from "antd";

const {Paragraph} = Typography;
const ListObjectComponent = ({data}) => {
    return (
        (data.result && data.result.content.length !== 0) ?
            <Row
                style={{
                    margin: "-16px -8px -16px -8px"
                }}
            >
                {data.result && data.result.content.map(o =>
                    <Col
                        key={o.id}
                        className="gutter-row" xs={24} sm={12} md={6} lg={4}
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