import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoute from "./Routes/Admin";

function App() {
    return (
        <div className="overflow-hidden ">
            <Router>
                <Routes>
                    <Route path="/*" element={<AdminRoute />} />
                    
                </Routes>
            </Router>
        </div>
    );
}

export default App;
