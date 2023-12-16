import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NoPage from "./pages/NoPage";
import HomePage from "./pages/HomePage";

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