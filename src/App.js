import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NoPage from "./components/pages/NoPage";
import HomePage from "./components/pages/home/HomePage";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<HomePage/>}/>
                    <Route path="*" element={<NoPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
export default App