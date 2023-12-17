import {Affix, Flex, Input} from "antd";

const {Search} = Input;
const SearchComponent = ({search}) => {
    const onSearch = (value, _e, info) => {
        search(value)
    }
    return (
        <Affix
            offsetTop={72}
        >
            <Flex
                justify="center"
                style={{
                    background: "white",
                    marginTop: -1,
                    padding: "8px 0",
                }}
            >
                <Search
                    placeholder="Tìm kiếm"
                    onSearch={onSearch}
                    style={{
                        width: '100%',
                        maxWidth: 500
                    }}
                />
            </Flex>
        </Affix>
    )
}
export default SearchComponent