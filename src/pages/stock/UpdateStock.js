import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import propTypes from 'prop-types';
import { Form, Button, Alert } from 'react-bootstrap';
import { selectAllStock, updateStatus } from '../../redux/stock/stockSlice';
import StockDropdown from '../../components/stockDropdown';
import { addStockLog } from '../../redux/stock/stockLogSlice';

const UpdateStock = ({ change }) => {
  const [stockId, setStockId] = useState(null);
  const [name, setName] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [givenTo, setGivenTo] = useState('');
  const [operation, setOperation] = useState(null);
  const [error, setError] = useState(false);

  const resetForm = () => {
    setStockId(null);
    setError(false);
    setName(null);
    setQuantity(null);
    setOperation(null);
  };

  const dispatch = useDispatch();
  const formRef = useRef(null);
  const stock = useSelector(selectAllStock);
  const canSave = stockId && name && quantity && operation;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSave) {
      dispatch(addStockLog({
        stock_id: stockId,
        stock_name: name,
        quantity,
        to_whom: givenTo,
        operation,
      }));
      resetForm();
      formRef.current.reset();
      dispatch(updateStatus());
      change('stocklist');
    } else {
      setError(true);
    }
  };
  const handleItemName = (val, name) => {
    setStockId(val);
    setName(name);
  };

  return (
    <div className="form-container">
      {error
      && (
      <Alert variant="danger" className="mt-2">
        Lütfen bilgileri giriniz.
      </Alert>
      )}
      <Form ref={formRef} className="d-flex flex-column stock-form" onSubmit={(e) => handleSubmit(e)}>
        <StockDropdown
          options={stock.map((item) => ({
            value: item.id,
            name: item.name,
          }))}
          handleClick={({ value, name }) => handleItemName(value, name)}
        />
        <Form.Group>
          <Form.Label>Miktar</Form.Label>
          <Form.Control type="text" placeholder="Miktar" onBlur={(e) => setQuantity(Number(e.target.value))} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Kişi (opsiyonel)</Form.Label>
          <Form.Control type="text" placeholder="Teslim Alan/Alınan Kişi" onBlur={(e) => setGivenTo(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Operasyon</Form.Label>
          <Form.Select onChange={(e) => setOperation(e.target.value)}>
            <option value={null}>Seçiniz</option>
            <option value={1}>Veri girişi</option>
            <option value={0}>Veri çıkışı</option>
          </Form.Select>
        </Form.Group>
        <Button variant="info" type="submit" className="mt-3">
          Kaydet
        </Button>
      </Form>
    </div>
  );
};
export default UpdateStock;

UpdateStock.propTypes = {
  change: propTypes.func.isRequired,
};
