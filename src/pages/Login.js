import React, { useState } from 'react';
import axios from '../services/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/user/login', { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      alert('Login success');
      window.location.href = '/pets';
    } catch (error) {
      alert('Login error. Check your credentials.');
    }
  };

  return (
    <div>
      <h1>User Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>User:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;