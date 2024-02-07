import React, { useState } from 'react';
import { Button, Alert, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SIGNUP_URL } from '../config/api';

const SignupForm = ({ setCurrentUser }) => {
  const navigate = useNavigate();
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

  const handleSubmit = (e) => {
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
        res.json().then((user) => setCurrentUser(user));
        navigate('/');
      } else {
        res.json().then((errors) => {
          setError(true);
          setErrorMsg(errors);
        });
      }
    });
  };

  return (
    <Form className="signup-form d-flex flex-column align-items-center justify-content-center" onSubmit={handleSubmit}>
      <h1>Sign up</h1>
      <Form.Group>
        <Form.Label htmlFor="username">Username:</Form.Label>
        <Form.Control
          id="username-signup-input"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password">Password:</Form.Label>
        <Form.Control
          id="password-signup-input"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </Form.Group>
      <Button type="submit" variant="info" className="my-2">Submit</Button>
      { (error) && (
        <Alert variant="danger">{errorMsg}</Alert>
      )}
    </Form>

  );
};

export default SignupForm;

SignupForm.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
};
