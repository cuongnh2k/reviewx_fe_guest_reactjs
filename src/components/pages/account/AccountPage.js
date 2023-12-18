import LayoutComponent from "../../layout/LayoutComponent";
import {useState} from "react";
import ResetPasswordComponent from "./ResetPasswordComponent";
import ActiveComponent from "./ActiveComponent";
import {Divider} from "antd";
import LogInComponent from "./LogInComponent";
import SignUpComponent from "./SignUpComponent";

const AccountPage = () => {
    const [activeKey, setActiveKey] = useState("3")
    const token = localStorage.getItem("token")
    const [refresh, setRefresh] = useState(0)

    const onChangeTab = (activeKey) => {
        setActiveKey(activeKey)
    }

    const handleRefresh = () => {
        setRefresh(Math.random)
    }

    if (token) {
        return (
            <LayoutComponent>
                <Divider/>
                <div>account</div>
            </LayoutComponent>
        )
    }

    switch (activeKey) {
        case "1":
            return (
                <LayoutComponent>
                    <Divider/>
                    <ResetPasswordComponent onChangeTab={onChangeTab} activeKey={activeKey} handleRefresh={handleRefresh}/>
                </LayoutComponent>
            )
        case "2":
            return (
                <LayoutComponent>
                    <Divider/>
                    <ActiveComponent onChangeTab={onChangeTab} activeKey={activeKey} handleRefresh={handleRefresh}/>
                </LayoutComponent>
            )
        case "3":
            return (
                <LayoutComponent>
                    <Divider/>
                    <LogInComponent onChangeTab={onChangeTab} activeKey={activeKey} handleRefresh={handleRefresh}/>
                </LayoutComponent>
            )
        case "4":
            return (
                <LayoutComponent>
                    <Divider/>
                    <SignUpComponent onChangeTab={onChangeTab} activeKey={activeKey} handleRefresh={handleRefresh}/>
                </LayoutComponent>
            )
    }
}
export default AccountPage