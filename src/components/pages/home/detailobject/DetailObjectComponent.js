import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import UseFetch from "../../../../hooks/UseFetch";
import Api from "../../../../api/Api";
import {Col, Divider, Row} from "antd";
import ListReviewComponent from "./ListReviewComponent";
import ObjectComponent from "./object/ObjectComponent";

const DetailObjectComponent = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({loading: false, result: null})
    // const [listReview, setListReview] = useState({loading: false, result: null})
    const [searchParams] = useSearchParams();
    const [refresh, setRefresh] = useState(Math.random)
    const objectId = searchParams.get("objectId") || ""

    useEffect(() => {
        const fetchAPI = async () => {
            setData(o => ({...o, loading: true}))
            const response = await UseFetch(Api.bObjectsV2GET,
                `/${objectId}`)
            const data = await response.json();
            if (!data.success) {
                navigate(`/${objectId}`)
            }
            setData(o => ({...o, loading: false, result: data.data}))
        }
        fetchAPI()
    }, []);

    // useEffect(() => {
    //     const fetchAPI = async () => {
    //         const response = await UseFetch(Api.bReviewsGET,
    //             `?objectId=${objectId}&pageSize=2147483647`)
    //         const data = await response.json();
    //         setListReview(o => ({...o, loading: false, result: data.data}))
    //     }
    //     fetchAPI()
    // }, []);

    const onRefresh = () => {
        setRefresh(Math.random)
    }

    return (<>
            <Divider/>
            <Row>
                <ObjectComponent data={data} /*listReview={listReview}*/ objectId={objectId} onRefresh={onRefresh}/>
                <Col
                    style={{
                        padding: 16
                    }}
                    xs={24} sm={24} md={12} lg={16} xl={16}>
                    <ListReviewComponent objectId={objectId} onRefresh={onRefresh} refresh={refresh}/>
                </Col>
            </Row>
        </>
    )
}
export default DetailObjectComponent