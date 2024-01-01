import LayoutComponent from "../../layout/LayoutComponent";
import {Divider} from 'antd';
import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import UseFetch from "../../../hooks/UseFetch";
import Api from "../../../api/Api";
import PaginationComponent from "../../common/PaginationComponent";
import ListProposeComponent from "./ListProposeComponent";
import CreateProposeComponent from "./createpropose/CreateProposeComponent";

const ProposePage = () => {
    const [data, setData] = useState({loading: false, result: null})
    const [search, setSearch] = useState({name: "", pageNumber: 1, pageSize: 10});
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get("categoryId") || ""
    const [refresh, setRefresh] = useState(Math.random)

    useEffect(() => {
        const fetchAPI = async () => {
            setData(o => ({...o, loading: true}))
            const response = await UseFetch(Api.uObjectsV1GET,
                `?categoryId=${categoryId}&pageNumber=${search.pageNumber - 1}&pageSize=${search.pageSize}`)
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

    return (
        <LayoutComponent>
            <Divider/>
            <CreateProposeComponent onRefresh={onRefresh}/>
            <ListProposeComponent data={data} onRefresh={onRefresh}/>
            <PaginationComponent data={data} onChange={onChange}/>
            <div style={{marginBottom: 20}}></div>
        </LayoutComponent>
    )
}
export default ProposePage