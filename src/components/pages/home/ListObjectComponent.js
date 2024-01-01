import {Card, Col, Empty, Row, Space, Typography} from "antd";
import {useSearchParams} from "react-router-dom";

const {Paragraph} = Typography;
const ListObjectComponent = ({data}) => {

    const [, setSearchParams] = useSearchParams();

    return (
        (data.result && data.result.content.length !== 0) ?
            <Row
            >
                {data.result && data.result.content.map(o =>
                    <Col
                        key={o.id}
                        className="gutter-row" xs={24} sm={12} md={6} lg={4}
                        style={{
                            padding: "16px",
                        }}
                    >
                        <Card
                            onClick={() => setSearchParams({objectId: o.id})}
                            style={{
                                width: "100%",
                            }}
                            hoverable
                            cover={<img src={o.avatar} alt={o.name}/>}
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