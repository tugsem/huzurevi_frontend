import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const Login = () => {
  const [error, setError] = useState(false);
  const [name, setName] = useState(null);
  const [pass, setPass] = useState(null);
  const handleSubmit = (e) => {
    if (name === 'adora' && pass === 'adora8080') {
      localStorage.setItem('isLogged', true);
    } else {
      e.preventDefault();
      setError(true);
    }
  };
  return (
    <div className="login-form d-flex flex-column align-items-center">
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group required>
          <Form.Label>Kullanıcı adı </Form.Label>
          <Form.Control type="text" onChange={(e) => setName(e.target.value.trim())} />
        </Form.Group>
        <Form.Group required>
          <Form.Label>Parola</Form.Label>
          <Form.Control type="password" onChange={(e) => setPass(e.target.value.trim())} />
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
