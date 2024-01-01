import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NoPage from "./components/pages/NoPage";
import HomePage from "./components/pages/home/HomePage";
import NotifyPage from "./components/pages/notify/NotifyPage";
import AccountPage from "./components/pages/account/AccountPage";
import ProposePage from "./components/pages/propose/ProposePage";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage/>}/>
                <Route path="/account" element={<AccountPage/>}/>
                <Route path="/propose" element={<ProposePage/>}/>
                <Route path="/notify" element={<NotifyPage/>}/>
                <Route path="*" element={<NoPage/>}/>
            </Routes>
        </BrowserRouter>
    );
};
export default App