import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { LOGIN_URL } from '../../config/api';
import './login.scss';

import SignupForm from '../SignUpForm';

const Login = ({ setCurrentUser, setIsAuthenticated }) => {
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(LOGIN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setCurrentUser(user);
          setIsAuthenticated(true);
          navigate('/');
        });
      } else {
        setErrorMessage('Invalid credentials');
        setError(true);
      }
    });
  };
  const handleSignup = () => {
    setShowSignup((prevState) => !prevState);
  };

  return (
    <div className="form-container d-flex justify-content-center">
      <Form onSubmit={handleSubmit} className={(showSignup) ? 'd-flex flex-column align-items-center justify-content-center login-form slideUp' : 'd-flex flex-column align-items-center justify-content-center login-form'}>
        <h1>Sign in</h1>
        <Form.Group required>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="username" onChange={handleChange} />
        </Form.Group>
        <Form.Group required>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" onChange={handleChange} />
        </Form.Group>
        <div className="d-flex w-100 justify-content-between align-items-center">
          <Button variant="success" type="submit" className="my-2 btn btn-lgS">
            Sign in
          </Button>
          <span>OR</span>
          <Button onClick={handleSignup} className={(showSignup) ? 'btn btn-sm go-back' : 'btn btn-sm'}>{(showSignup) ? 'Sign in' : 'Sign up'}</Button>
        </div>
        { (error) && (
        <Alert variant="danger">{errorMessage}</Alert>
        )}
      </Form>
      {(showSignup) && (
        <SignupForm setCurrentUser={setCurrentUser} />
      )}
    </div>
  );
};

export default Login;

Login.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};
