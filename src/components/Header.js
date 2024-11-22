import React from "react";

const Header = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        alert("Logged out successfully.");
        window.location.href = "/login";
    };

    return (
        <header>
            <h1>My Gremlins</h1>
            <button onClick={handleLogout}>Log Out</button>
        </header>
    );
};