import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route,Navigate } from "react-router-dom";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import Error from "../Components/Admin/Error/Error";
import Error404 from "../Components/Admin/Error/404";
import AddProductPage from "../Pages/Addproduct";


function AdminRoute() {
    const IsAdminAuth = useSelector((state) => state.Admin.Token);
    return (
        <div>
            <Routes>
                <Route path="/login" element={IsAdminAuth ? <Navigate to="/" />  : <Login />} /> 
                <Route path="/" element={IsAdminAuth ? <Home /> : <Navigate to="/login" /> } />
                 <Route path="/addproduct" element={IsAdminAuth ? <AddProductPage /> : <Navigate to="/login" /> } />
                <Route path='/error' element={<Error />}/>
                <Route path='/*' element={<Error404 />}/>
            </Routes>
        </div>
    );
}

export default AdminRoute;