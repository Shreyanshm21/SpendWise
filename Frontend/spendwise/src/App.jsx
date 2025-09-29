import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import UserProvider from "./context/userContext";

function App() {
    return (
        <UserProvider>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Root />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/dashboard" element={<Home />} />
                        <Route path="/income" element={<Income />} />
                        <Route path="/expense" element={<Expense />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </UserProvider>
    );
}

const Root = () => {
    const isAuthenticated = !!localStorage.getItem("token");

    return isAuthenticated ? (
        <Navigate to="/dashboard" />
    ) : (
        <Navigate to="/login" />
    );
};

export default App;
