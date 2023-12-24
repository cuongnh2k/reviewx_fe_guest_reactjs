import LayoutComponent from "../../layout/LayoutComponent";
import SearchComponent from "./SearchComponent";
import {useEffect, useState} from "react";
import UseFetch from "../../../hooks/UseFetch";
import Api from "../../../api/Api";
import {useSearchParams} from "react-router-dom";
import ListObjectComponent from "./ListObjectComponent";
import {Divider} from "antd";
import PaginationComponent from "../../common/PaginationComponent";

const HomePage = () => {
    const [data, setData] = useState({loading: false, result: null})
    const [search, setSearch] = useState({name: "", pageNumber: 1, pageSize: 10});
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get("categoryId")

    useEffect(() => {
        const fetchAPI = async () => {
            setData(o => ({...o, loading: true}))
            const response = await UseFetch(Api.bObjectsV2GET,
                `?categoryId=${categoryId}&name=${search.name}&pageNumber=${search.pageNumber - 1}&pageSize=${search.pageSize}`)
            const data = await response.json();
            setData(o => ({...o, loading: false, result: data.data}))
        }
        fetchAPI()
    }, [search]);

    const onChange = (page, pageSize) => {
        setSearch(o => ({...o, pageNumber: page, pageSize: pageSize}))
    }

    return (
        <LayoutComponent>
            <SearchComponent search={value => setSearch(o => ({...o, name: value}))}/>
            <Divider/>
            <ListObjectComponent data={data}/>
            <Divider/>
            <PaginationComponent data={data} onChange={onChange}/>
        </LayoutComponent>
    )
}
export default HomePage