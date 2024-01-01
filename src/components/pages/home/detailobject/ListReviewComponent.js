import {DislikeOutlined, LikeOutlined} from '@ant-design/icons';
import React, {useEffect, useState} from 'react';
import {Avatar, List, Space} from 'antd';
import UseFetch from "../../../../hooks/UseFetch";
import Api from "../../../../api/Api";
import PaginationComponent from "../../../common/PaginationComponent";
import {useNavigate} from "react-router-dom";

const IconText = ({icon, text}) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
const ListReviewComponent = ({objectId, onRefresh, refresh}) => {
    const [data, setData] = useState({loading: false, result: null})
    const [search, setSearch] = useState({name: "", pageNumber: 1, pageSize: 10});
    const [like, setLike] = useState({isLike: null, reviewId: ""})
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAPI = async () => {
            setData(o => ({...o, loading: true}))
            const response = await UseFetch(Api.bReviewsGET,
                `?objectId=${objectId}&pageNumber=${search.pageNumber - 1}&pageSize=${search.pageSize}`)
            const data = await response.json();
            setData(o => ({...o, loading: false, result: data.data}))
        }
        fetchAPI()
    }, [search, refresh]);

    useEffect(() => {
        if (like.isLike !== null && like.reviewId !== "") {
            const fetchAPI = async () => {
                // setData(o => ({...o, loading: true}))
                const response = await UseFetch(Api.uReviewsIdReactionPOST,
                    `/${like.reviewId}/reaction`,
                    JSON.stringify({isLike: like.isLike})
                )
                const data = await response.json();
                // setData(o => ({...o, loading: false, result: data.data}))
                if (data.success) {
                    onRefresh()
                    // messageApi.success("Cập nhật đánh giá thành công")
                } else {
                    if (data.errorCode === 401) {
                        localStorage.removeItem("token")
                        navigate(`/account`)
                    }
                    // else {
                    //     messageApi.error("Cập nhật đánh giá thất bại")
                    // }
                }
            }
            fetchAPI()
        }
    }, [like]);

    const onLike = (reviewId) => {
        console.log(reviewId)
        setLike(o => ({isLike: true, reviewId: reviewId}))
    }

    const onDisLike = (reviewId) => {
        console.log(reviewId)
        setLike(o => ({isLike: false, reviewId: reviewId}))
    }

    const onChange = (page, pageSize) => {
        setSearch(o => ({...o, pageNumber: page, pageSize: pageSize}))
    }
    return (
        <>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={data.result && data.result.content || []}
                renderItem={(item) => (
                    <List.Item
                        key={item.id}
                        actions={[
                            <div
                                onClick={() => onDisLike(item.id)}
                            >
                                <IconText
                                    icon={DislikeOutlined}
                                    text={item.reactions ? item.reactions.filter(o => !o.isLike).length : 0}
                                    key="list-vertical-star-o"
                                />
                            </div>,
                            <div
                                onClick={() => onLike(item.id)}
                            >
                                <IconText
                                    icon={LikeOutlined}
                                    text={item.reactions ? item.reactions.filter(o => o.isLike).length : 0}
                                    key="list-vertical-like-o"
                                />
                            </div>,
                            // <IconText icon={MessageOutlined} text="2" key="list-vertical-message"/>,
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar style={{width: 48, height: 48}} src={item.createdBy.avatar}/>}
                            title={item.createdBy.name}
                            description={new Date(item.updatedAt).toLocaleString()}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
            <PaginationComponent data={data} onChange={onChange}/>
        </>
    )
}
export default ListReviewComponent