import React, { useState, useRef } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import propTypes from 'prop-types';
import { addStock } from '../../redux/stock/stockSlice';
import capitalizeWords from '../../modules/capitalizeWords';

const NewStock = ({ change }) => {
  const [error, setError] = useState(false);
  const [name, setName] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [unit, setUnit] = useState(null);

  const resetForm = () => {
    setError(false);
    setName(null);
    setQuantity(null);
    setUnit(null);
  };
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const canSave = name && quantity && unit;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSave) {
      dispatch(
        addStock({
          name: capitalizeWords(name),
          quantity,
          unit,
        }),
      );
      resetForm();
      change('stocklist');
      formRef.current.reset();
    } else {
      setError(true);
    }
  };

  return (
    <section className="form-container">
      <Form ref={formRef} className="d-flex flex-column stock-form" onSubmit={(e) => handleSubmit(e)}>
        <Form.Group required>
          <Form.Label>Ürün </Form.Label>
          <Form.Control type="text" placeholder="Ürün ismi" defaultValue="" onBlur={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group required>
          <Form.Label>Miktar</Form.Label>
          <Form.Control type="text" placeholder="Miktar" defaultValue="" onBlur={(e) => setQuantity(Number(e.target.value))} />
        </Form.Group>
        <Form.Group required>
          <Form.Label>Birim</Form.Label>
          <Form.Select className="dd-unit" defaultValue="" onChange={(e) => setUnit(e.target.value)}>
            <option value={null}>Birim Seçiniz</option>
            <option>Adet</option>
            <option>Kg</option>
            <option>Lt</option>
          </Form.Select>
        </Form.Group>
        {error && <Alert variant="danger" className="mt-2">Lütfen gerekli yerleri doldurunuz.</Alert>}
        <Button variant="info" type="submit" className="mt-3">
          Kaydet
        </Button>
      </Form>
    </section>
  );
};

export default NewStock;

NewStock.propTypes = {
  change: propTypes.func.isRequired,
};
