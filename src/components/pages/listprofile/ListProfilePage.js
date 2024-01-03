import LayoutComponent from "../../layout/LayoutComponent";
import {Divider, Flex, Radio} from 'antd';
import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import UseFetch from "../../../hooks/UseFetch";
import Api from "../../../api/Api";
import PaginationComponent from "../../common/PaginationComponent";
import ListComponent from "./ListComponent";

const ListProfilePage = () => {
    const [data, setData] = useState({loading: false, result: null})
    const [search, setSearch] = useState({isActive: true, name: "", pageNumber: 1, pageSize: 10});
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get("categoryId") || ""
    const [refresh, setRefresh] = useState(Math.random)
    const [status, setStatus] = useState(true)

    useEffect(() => {
        const fetchAPI = async () => {
            setData(o => ({...o, loading: true}))
            const response = await UseFetch(Api.aUsersGET,
                `?isActive=${search.isActive}&pageNumber=${search.pageNumber - 1}&pageSize=${search.pageSize}`)
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
        setSearch(o => ({...o, isActive: e.target.value}))
        setStatus(e.target.value)
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
                    value={status}
                >
                    <Radio value={true}>Đã kích hoạt</Radio>
                    <Radio value={false}>Chưa kích hoạt</Radio>
                </Radio.Group>
            </Flex>
            <ListComponent data={data} onRefresh={onRefresh}/>
            <PaginationComponent data={data} onChange={onChange}/>
            <div style={{marginBottom: 20}}></div>
        </LayoutComponent>
    )
}
export default ListProfilePage