/* eslint-disable */
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStock, getStockError } from '../../redux/stock/stockSlice';
import capitalizeWords from '../../modules/capitalizeWords';

const NewStock = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('Adet');

  const dispatch = useDispatch();
  const error = useSelector(getStockError);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addStock({
        name: capitalizeWords(name),
        quantity,
        unit }),
    );
    navigate('/stock')
  };
  let message;
  if (error) {
    message = <p>{error}</p>;
  }
  return (
    <section className="m-5 w-50">
      <h1>Yeni Ürün Kaydı</h1>
      <a href="update-item">Mevcut Ürünü Düzenle</a>
      {message}
      <Form className="d-flex flex-column" onSubmit={(e) => handleSubmit(e)}>
        <Form.Group>
          <Form.Label>Ürün</Form.Label>
          <Form.Control type="text" onBlur={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Miktar</Form.Label>
          <Form.Control type="text" onBlur={(e) => setQuantity(Number(e.target.value))} />
        </Form.Group>
        <Form.Select id="dd_stock_unit" title="birim seçiniz" onChange={(e) => setUnit(e.target.value)}>
          <option>Adet</option>
          <option>Kg</option>
          <option>Lt</option>
        </Form.Select>
        <Button variant="info" type="submit">
          Kaydet
        </Button>
      </Form>
    </section>
  );
};

export default NewStock;
