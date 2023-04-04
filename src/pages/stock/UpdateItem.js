import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import propTypes from 'prop-types';
import { Form, Button, Alert } from 'react-bootstrap';
import { selectAllStock, updateStockItem } from '../../redux/stock/stockSlice';
import capitalizeWords from '../../modules/capitalizeWords';
import StockDropdown from '../../components/stockDropdown';

const UpdateItem = ({ change }) => {
  const dispatch = useDispatch();
  const formRef = useRef(null);

  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [unit, setUnit] = useState(null);
  const [error, setError] = useState(false);
  const stock = useSelector(selectAllStock);

  const resetForm = () => {
    setId(null);
    setName(null);
    setQuantity(null);
    setUnit(null);
    setError(false);
  };

  const canSave = id && quantity && unit;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    if (name && canSave) {
      dispatch(updateStockItem({
        id,
        name: capitalizeWords(name),
        quantity,
        unit,
      }));
      resetForm();
      formRef.current.reset();
      change('stocklist');
    } else if (canSave) {
      dispatch(updateStockItem({
        id,
        quantity,
        unit,
      }));
      resetForm();
      formRef.current.resset();
      change('stocklist');
    } else {
      setError(true);
      console.log(id, quantity, unit);
    }
  };
  return (
    <div className="form-container">
      <Form ref={formRef} className="d-flex flex-column stock-form" onSubmit={(e) => handleSubmit(e)}>
        <StockDropdown
          options={stock.map((item) => ({
            value: item.id,
            name: item.name,
          }))}
          handleClick={({ value }) => setId(value)}
        />
        <Form.Group required>
          <Form.Label>İsim</Form.Label>
          <Form.Control type="text" placeholder="Yeni isim" defaultValue="" onBlur={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group required>
          <Form.Label>Miktar</Form.Label>
          <Form.Control type="text" placeholder="Miktar" defaultValue="" onBlur={(e) => setQuantity(Number(e.target.value))} />
        </Form.Group>
        <Form.Group required>
          <Form.Label>Birim</Form.Label>
          <Form.Select id="dd_stock_unit" defaultValue="" onChange={(e) => setUnit(e.target.value)}>
            <option value={null}>Seçiniz</option>
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
    </div>
  );
};

export default UpdateItem;

UpdateItem.propTypes = {
  change: propTypes.func.isRequired,
};
