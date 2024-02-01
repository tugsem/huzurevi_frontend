import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { LOGIN_URL } from '../../config/api';

const Login = ({ setCurrentUser, setIsAuthenticated }) => {
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
  return (
    <div className="login-form d-flex flex-column align-items-center">
      <Form onSubmit={handleSubmit}>
        <Form.Group required>
          <Form.Label>Kullanıcı adı </Form.Label>
          <Form.Control type="text" name="username" onChange={handleChange} />
        </Form.Group>
        <Form.Group required>
          <Form.Label>Parola</Form.Label>
          <Form.Control type="password" name="password" onChange={handleChange} />
        </Form.Group>
        <Button variant="info" type="submit" className="my-2">
          Giriş Yap
        </Button>
      </Form>
      <Link to="/signup">Hesap oluştur</Link>
      { (error) && (
        <Alert variant="danger">{errorMessage}</Alert>
      )}
    </div>
  );
};

export default Login;

Login.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};
