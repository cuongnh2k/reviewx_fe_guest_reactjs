import {Col, Flex, Image, Rate, Typography} from "antd";
import FormReviewComponent from "./FormReviewComponent";

const {Text} = Typography
const ObjectComponent = ({data, objectId, onRefresh}) => {
    return (
        <Col
            style={{
                padding: 16
            }}
            xs={24} sm={24} md={12} lg={8} xl={8}
        >
            <Flex
                vertical={true}
            >
                <Rate
                    style={{
                        fontSize: 48,
                        marginBottom: 10
                    }}
                    disabled
                    value={data.result && data.result.averageRating}
                />
                <Image
                    style={{
                        width: "100%"
                    }}
                    src={data.result && data.result.avatar}
                />
                <FormReviewComponent /*listReview={listReview}*/ objectId={objectId} onRefresh={onRefresh}/>
            </Flex>
        </Col>
    )
}
export default ObjectComponent