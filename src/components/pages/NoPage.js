import {Button, Result} from "antd";
import LayoutComponent from "../layout/LayoutComponent";
import {useNavigate} from "react-router-dom";

const NoPage = () => {
    const navigate = useNavigate();
    return (
        <LayoutComponent>
            <Result
                status="404"
                title="404"
                subTitle="Xin lỗi, trang bạn truy cập không tồn tại"
                extra={<Button type="primary" onClick={() => navigate("/")}>Về trang chủ</Button>}
            />
        </LayoutComponent>
    )
}
export default NoPage