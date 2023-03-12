import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addStock, getStockError } from '../../redux/stock/stockSlice';

const NewStock = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('Adet');

  const dispatch = useDispatch();
  const error = useSelector(getStockError);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addStock({ name, quantity, unit }),
    );
  };
  let message;
  if (error) {
    message = <p>{error}</p>;
  }
  return (
    <section className="m-5 w-50">
      <h1>Yeni Kayıt</h1>
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
