import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/users/signup', { first_name: firstName, last_name: lastName, email, password })
      .then(response => {
        // Handle signup success
      })
      .catch(error => {
        console.error("There was an error signing up!", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;
