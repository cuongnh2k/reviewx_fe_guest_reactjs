import LayoutComponent from "../../layout/LayoutComponent";
import {useState} from "react";
import ResetPasswordComponent from "./ResetPasswordComponent";
import ActiveComponent from "./ActiveComponent";
import {Divider} from "antd";
import SignInComponent from "./SignInComponent";
import SignUpComponent from "./SignUpComponent";
import UpdateAccountComponent from "./UpdateAccountComponent";

const AccountPage = () => {
    const [activeKey, setActiveKey] = useState("sign-in")
    const token = localStorage.getItem("token")

    const onChangeTab = (activeKey) => {
        setActiveKey(activeKey)
    }

    if (token) {
        return (
            <LayoutComponent>
                <UpdateAccountComponent/>
            </LayoutComponent>
        )
    }

    switch (activeKey) {
        case "1":
            return (
                <LayoutComponent>
                    <Divider/>
                    <ResetPasswordComponent onChangeTab={onChangeTab} activeKey={activeKey}/>
                </LayoutComponent>
            )
        case "2":
            return (
                <LayoutComponent>
                    <Divider/>
                    <ActiveComponent onChangeTab={onChangeTab} activeKey={activeKey}/>
                </LayoutComponent>
            )
        case "sign-in":
            return (
                <LayoutComponent>
                    <Divider/>
                    <SignInComponent onChangeTab={onChangeTab} activeKey={activeKey}/>
                </LayoutComponent>
            )
        case "sign-up":
            return (
                <LayoutComponent>
                    <Divider/>
                    <SignUpComponent onChangeTab={onChangeTab} activeKey={activeKey}/>
                </LayoutComponent>
            )
    }
}
export default AccountPage