import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addStock } from '../../redux/stock/stockSlice';
import capitalizeWords from '../../modules/capitalizeWords';

const NewStock = () => {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [name, setName] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [unit, setUnit] = useState(null);

  const dispatch = useDispatch();
  const canSave = name && quantity && unit;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSave) {
      setShowError(false);
      dispatch(
        addStock({
          name: capitalizeWords(name),
          quantity,
          unit,
        }),
      );
      navigate('/');
    } else {
      setShowError(true);
    }
  };

  return (
    <section className="form-container">

      <h1 className="main-heading">Yeni Ürün Kaydı</h1>
      <a href="update-item">Mevcut Ürünü Düzenle</a>
      <Form className="d-flex flex-column stock-form" onSubmit={(e) => handleSubmit(e)}>
        <Form.Group required>
          <Form.Label>Ürün </Form.Label>
          <Form.Control type="text" placeholder="Ürün ismi" onBlur={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group required>
          <Form.Label>Miktar</Form.Label>
          <Form.Control type="text" placeholder="Miktar" onBlur={(e) => setQuantity(Number(e.target.value))} />
        </Form.Group>
        <Form.Group required>
          <Form.Label>Birim</Form.Label>
          <Form.Select className="dd-unit" onChange={(e) => setUnit(e.target.value)}>
            <option value={null}>Birim Seçiniz</option>
            <option>Adet</option>
            <option>Kg</option>
            <option>Lt</option>
          </Form.Select>
        </Form.Group>
        {showError && <Alert variant="danger">Lütfen gerekli yerleri doldurunuz.</Alert>}
        <Button variant="info" type="submit">
          Kaydet
        </Button>
      </Form>
    </section>
  );
};

export default NewStock;
