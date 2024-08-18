import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './Signup.css';  // Import the CSS file

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const navigate = useNavigate();  // Hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/users/signup', { first_name: firstName, last_name: lastName, email, password, phone })
      .then(response => {
        toast.success('Signup successful!');
        setTimeout(() => {
          navigate('/login');  // Navigate to the login page after a delay
        }, 2000);  // Delay of 2 seconds to allow the toast to be seen
      })
      .catch(error => {
        if (error.response) {
          toast.error(`Error: ${error.response.data.error || 'There was an error signing up!'}`);
          console.error("Error response:", error.response.data);
        } else if (error.request) {
          toast.error('No response received from the server.');
          console.error("Error request:", error.request);
        } else {
          toast.error('Something went wrong with the signup request.');
          console.error("Error message:", error.message);
        }
      });
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Create an Account</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="signup-button">Signup</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;
