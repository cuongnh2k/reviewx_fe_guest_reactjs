import React, {useEffect, useState} from 'react'
import {Flex, theme, TreeSelect} from 'antd'
import UseFetch from "../../../../hooks/UseFetch"
import Api from "../../../../api/Api"
import {useSearchParams} from "react-router-dom"

const CategoryComponent = () => {
    const [data, setData] = useState({loading: false, result: null})
    const [value, setValue] = useState()
    const [, setSearchParams] = useSearchParams()
    const {
        token: {colorBgContainer},
    } = theme.useToken()

    useEffect(() => {
        const fetchAPI = async () => {
            setData(o => ({...o, loading: true}))
            const response = await UseFetch(Api.bCategoriesGET)
            const data = await response.json();
            setData(o => ({...o, loading: false, result: data.data}))
        }
        fetchAPI()
    }, [])

    const onSelect = (title, object) => {
        setValue(object.title);
        let id = "";
        data.result && data.result.forEach(o => {
            if (o.id === object.value) {
                id = o.id
            }
            o.childs && o.childs.forEach(oo => {
                if (oo.id === object.value) {
                    id = o.id + "." + oo.id
                }
                oo.childs && oo.childs.forEach(ooo => {
                    if (ooo.id === object.value) {
                        id = o.id + "." + oo.id + "." + ooo.id
                    }
                })
            })
        })
        setSearchParams({categoryId: id});
    }

    return (
        <Flex
            justify="center"
            style={{
                background: colorBgContainer,
                marginTop: -1,
                padding: "8px 16px",
            }}
        >
            <TreeSelect
                // showSearch
                style={{
                    width: '100%',
                    maxWidth: 500
                }}
                value={value}
                dropdownStyle={{
                    maxHeight: 400,
                    overflow: 'auto',
                }}
                placeholder="Chọn danh mục"
                allowClear
                // treeDefaultExpandAll
                onSelect={onSelect}
                treeData={data.result && data.result.map(o =>
                    (
                        {
                            value: o.id,
                            title: o.name,
                            children: o.childs && o.childs.map(oo => (
                                    {
                                        value: oo.id,
                                        title: oo.name,
                                        children: oo.childs && oo.childs.map(ooo => (
                                                {
                                                    value: ooo.id,
                                                    title: ooo.name,
                                                }
                                            )
                                        )
                                    }
                                )
                            )
                        }
                    )
                )
                }
            />
        </Flex>
    )
}
export default CategoryComponent