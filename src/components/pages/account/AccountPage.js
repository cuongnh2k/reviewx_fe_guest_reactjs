import LayoutComponent from "../../layout/LayoutComponent";
import {useState} from "react";
import {Divider} from "antd";
import SignInComponent from "./SignInComponent";
import SignUpComponent from "./SignUpComponent";
import UpdateAccountComponent from "./UpdateAccountComponent";

const AccountPage = () => {
    const [activeKey, setActiveKey] = useState("sign-in")
    const [login, setLogin] = useState(false)
    const token = localStorage.getItem("token")

    const onChangeTab = (activeKey) => {
        setActiveKey(activeKey)
    }

    const onLogin = (value) => {
        setLogin(value)
    }

    if (token) {
        return (
            <LayoutComponent>
                <UpdateAccountComponent/>
            </LayoutComponent>
        )
    }

    switch (activeKey) {
        // case "1":
        //     return (
        //         <LayoutComponent>
        //             <Divider/>
        //             <ResetPasswordComponent onChangeTab={onChangeTab} activeKey={activeKey}/>
        //         </LayoutComponent>
        //     )
        // case "2":
        //     return (
        //         <LayoutComponent>
        //             <Divider/>
        //             <ActiveComponent onChangeTab={onChangeTab} activeKey={activeKey}/>
        //         </LayoutComponent>
        //     )
        case "sign-in":
            return (
                <LayoutComponent>
                    <Divider/>
                    <SignInComponent onChangeTab={onChangeTab} activeKey={activeKey} onLogin={onLogin}/>
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