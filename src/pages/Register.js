import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../register.css";

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('User');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:8080/user/register', {
                username,
                password,
                role,
            });

            const token = response.data.token; // Asegúrate de obtener el token del registro
            localStorage.setItem('token', token);

            alert('User registered successfully. Now you can see your gremlins.');
            navigate('/login');
        } catch (error) {
            alert('Failure at registering. Try again.');
        }
    };

    return (
        <div className="register-container">
          <div className="register-card">
            <label className="register-label">USERNAME</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="register-input"
            />

            <label className="register-label">PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="register-input"
            />

            <label className="register-label">ROLE</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="register-select"
            >
              <option value="user">USER</option>
              <option value="admin">ADMIN</option>
            </select>

            <button onClick={handleRegister} className="register-button">
              REGISTER
            </button>
          </div>
        </div>
      );
    };

export default Register;