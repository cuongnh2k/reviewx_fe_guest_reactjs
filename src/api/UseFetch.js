import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const UseFetch = (api, params = "", body = null, condition = []) => {
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_HOST}${api.path}${params}`,
            {
                method: api.method,
                headers: {
                    "Content-Type": api.contentType,
                    "Api-Key": process.env.REACT_APP_API_KEY,
                    "Authentication": `Bearer ${localStorage.getItem("token")}`
                },
                body: body
            }
        )
            .then(res => res.json())
            .then(data => {
                if (!data.success && data.errorCode === 401) {
                    navigate("/account")
                }
                setData(data.data)
            });
    }, condition);

    return data;
};
export default UseFetch