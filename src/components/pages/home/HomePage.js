import LayoutComponent from "../../layout/LayoutComponent";
import SearchComponent from "./SearchComponent";
import {useState} from "react";
import useFetch from "../../../api/UseFetch";
import Api from "../../../api/Api";
import {useSearchParams} from "react-router-dom";
import ListObjectComponent from "./ListObjectComponent";
import {Divider} from "antd";
import PaginationComponent from "../../common/PaginationComponent";

const HomePage = () => {
    const [search, setSearch] = useState("");
    const [searchParams] = useSearchParams();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    let listObject = useFetch(Api.bObjectsV2GET,
        `?categoryId=${searchParams.get("categoryId")}&name=${search}&pageNumber=${page - 1}&pageSize=${pageSize}`,
        null,
        [search, searchParams, page, pageSize]);

    const onChange = (page, pageSize) => {
        setPage(page)
        setPageSize(pageSize)
    }

    return (
        <LayoutComponent>
            <SearchComponent search={(value) => setSearch(value)}/>
            <Divider/>
            <ListObjectComponent listObject={listObject}/>
            <Divider/>
            <PaginationComponent listObject={listObject} onChange={onChange}/>
        </LayoutComponent>
    )
}
export default HomePage