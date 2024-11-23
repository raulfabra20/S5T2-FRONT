import React, { useState } from 'react';
import axios from '../services/api';
import "../login.css";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario
    try {
      const response = await axios.post('/user/login', { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      alert('Login success');
      window.location.href = '/pets'; // Redirige al usuario
    } catch (error) {
      alert('Login error. Check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title"></h1>
        <form onSubmit={handleLogin}>
          <label className="login-label" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            className="login-input"
            value={username} // Vincula el valor del estado al input
            onChange={(e) => setUsername(e.target.value)} // Actualiza el estado
          />
          <label className="login-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="login-input"
            value={password} // Vincula el valor del estado al input
            onChange={(e) => setPassword(e.target.value)} // Actualiza el estado
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;