import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../Home.css";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
          <div className="home-card">
            <h1 className="home-title">Welcome to Gremlin Land</h1>
            <div className="home-buttons">
              <button className="home-button" onClick={() => navigate("/login")}>
                Login
              </button>
              <button className="home-button" onClick={() => navigate("/register")}>
                Register
              </button>
            </div>
          </div>
        </div>
      );
    };

export default Home;