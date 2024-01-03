import LayoutComponent from "../../layout/LayoutComponent";
import {Divider, Flex, Radio} from 'antd';
import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import UseFetch from "../../../hooks/UseFetch";
import Api from "../../../api/Api";
import PaginationComponent from "../../common/PaginationComponent";
import ListProposeComponent from "./ListProposeComponent";

const ListProposePage = () => {
    const [data, setData] = useState({loading: false, result: null})
    const [search, setSearch] = useState({status: "NEW", name: "", pageNumber: 1, pageSize: 10});
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get("categoryId") || ""
    const [refresh, setRefresh] = useState(Math.random)

    useEffect(() => {
        const fetchAPI = async () => {
            setData(o => ({...o, loading: true}))
            const response = await UseFetch(Api.aObjectsV1GET,
                `?status=${search.status}&categoryId=${categoryId}&pageNumber=${search.pageNumber - 1}&pageSize=${search.pageSize}`)
            const data = await response.json();
            if (data.success) {
                setData(o => ({...o, loading: false, result: data.data}))
            } else {
                localStorage.removeItem("token")
                navigate(`/account`)
            }
        }
        fetchAPI()
    }, [search, searchParams, refresh]);

    const onChange = (page, pageSize) => {
        setSearch(o => ({...o, pageNumber: page, pageSize: pageSize}))
    }

    const onRefresh = () => {
        setRefresh(Math.random)
    }
    const onChangeStatus = (e) => {
        setSearch(o => ({...o, status: e.target.value}))
    };
    return (
        <LayoutComponent>
            <Divider/>
            <Flex
                style={{
                    padding: 16
                }}
                justify="center"
            >
                <Radio.Group
                    onChange={onChangeStatus}
                    value={search.status}
                >
                    <Radio value={"NEW"}>Mới</Radio>
                    <Radio value={"SUCCESS"}>Thành công</Radio>
                    <Radio value={"REJECT"}>Từ chối</Radio>
                </Radio.Group>
            </Flex>
            <ListProposeComponent data={data} onRefresh={onRefresh}/>
            <PaginationComponent data={data} onChange={onChange}/>
            <div style={{marginBottom: 20}}></div>
        </LayoutComponent>
    )
}
export default ListProposePage