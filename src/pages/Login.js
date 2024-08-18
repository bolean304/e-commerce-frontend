import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import a CSS file for styling
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages

    axios.post('http://localhost:8000/users/login', { email, password })
      .then(response => {
        setMessage('Login successful!');
        setMessageType('success');
        navigate('/');
        // Optionally redirect or perform other actions
      })
      .catch(error => {
        setMessage('There was an error logging in. Please try again.');
        setMessageType('error');
        console.error("There was an error logging in!", error);
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Login</button>
        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
