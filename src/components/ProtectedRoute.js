import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("No estás autenticado. Redirigiendo al login...");
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;