import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { SIGNUP_URL } from '../config/api';

const SignupForm = ({ setCurrentUser }) => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    const userCreds = { ...formData };

    fetch(SIGNUP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCreds),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) =>setCurrentUser(user));
      } else {
        res.json().then((errors) => {
          setError(true);
          setErrorMsg(errors);
        });
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
      <label htmlFor="username">Username:</label>
      <input
        id="username-signup-input"
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <label htmlFor="password">Password:</label>
      <input
        id="password-signup-input"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <Button type="submit" variant="info" className="my-2">Submit</Button>
      { (error) && (
        <Alert variant="danger">{errorMsg}</Alert>
      )}
    </form>
  );
};

export default SignupForm;
