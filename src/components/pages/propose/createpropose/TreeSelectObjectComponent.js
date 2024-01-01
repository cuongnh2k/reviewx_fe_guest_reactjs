import {TreeSelect} from "antd";
import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import UseFetch from "../../../../hooks/UseFetch";
import Api from "../../../../api/Api";

const TreeSelectObjectComponent = ({onChangeObject}) => {
    const [value, setValue] = useState();
    const [data, setData] = useState([])
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get("categoryId") || ""

    useEffect(() => {
        const fetchAPI = async () => {
            // setData(o => ({...o, loading: true}))
            const response = await UseFetch(Api.bObjectsV2GET,
                `?categoryId=${categoryId}&pageNumber=2147483647`)
            const data = await response.json();
            // setData(o => ({...o, loading: false, result: data.data}))
            if (data.success) {
                setData(data.data.content.map(o => ({
                    value: o.id,
                    title: o.name,
                })))
            }
        }
        fetchAPI()
    }, [searchParams]);

    const onChange = (newValue) => {
        setValue(newValue);
        onChangeObject(newValue)
    };
    return (
        <div
            style={{padding: "8px 16px"}}
        >
            <TreeSelect
                showSearch
                style={{
                    width: '100%',
                }}
                value={value}
                dropdownStyle={{
                    maxHeight: 400,
                    overflow: 'auto',
                }}
                placeholder="Chọn đối tượng"
                allowClear
                treeDefaultExpandAll
                onChange={onChange}
                treeData={data}
            />
        </div>
    )
}
export default TreeSelectObjectComponent