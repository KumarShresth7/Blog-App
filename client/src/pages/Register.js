import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'
import { baseUrl } from '../baseUrl';

const Register = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/auth/register`, { username, password });
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Registration error', error);
    }
  };

  return (
    <div className='register'>
    <form onSubmit={handleSubmit} className='register-form'>
      <h1>Register</h1>
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
      <button type="submit">Register</button>
      <a href='/login'>Already a User?</a>
    </form>
    </div>
  );
};

export default Register;
