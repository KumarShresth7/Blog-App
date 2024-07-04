import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'
import { baseUrl } from '../baseUrl';

const LoginPage = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, { username, password });
      console.log(response.data.username)
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Invalid credentials', error);
    }
  };

  return (
    <div className='login'>
    <form onSubmit={handleSubmit} className='login-form'>
      <h1>Login</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
      <a href='/register'>New User?</a>
    </form>
    </div>
  );
};

export default LoginPage;
