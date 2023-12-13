import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { LOGIN_URL } from '../../config/api';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(false);

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
        console.log(res.status);
        navigate('/stocks');
      } else {
        console.log(res.status);
        res.json().then((errors) => {
          console.log(errors);
          setError(true);
        });
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
        {error && <Alert variant="danger">Lütfen doğru bilgileri giriniz.</Alert>}
      </Form>
    </div>
  );
};

export default Login;
