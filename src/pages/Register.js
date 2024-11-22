import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
            navigate('/pets');
        } catch (error) {
            alert('Failure at registering. Try again.');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Register</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ display: 'block', margin: '10px auto' }}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ display: 'block', margin: '10px auto' }}
            />
            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{ display: 'block', margin: '10px auto' }}
            >
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            <button onClick={handleRegister} style={{ marginTop: '20px' }}>
                Register
            </button>
        </div>
    );
};

export default Register;