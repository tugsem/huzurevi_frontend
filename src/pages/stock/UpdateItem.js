import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { selectAllStock, updateStockItem, fetchStock } from '../../redux/stock/stockSlice';
import capitalizeWords from '../../modules/capitalizeWords';
import StockDropdown from '../../components/stockDropdown';

const UpdateItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [unit, setUnit] = useState(null);
  const [showError, setShowError] = useState(false);
  const stock = useSelector(selectAllStock);

  const canSave = id && quantity && unit;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowError(false);
    if (name && canSave) {
      dispatch(updateStockItem({
        id,
        name: capitalizeWords(name),
        quantity,
        unit,
      }));
      dispatch(fetchStock());
      navigate('/');
    } else if (canSave) {
      setShowError(false);
      dispatch(updateStockItem({
        id,
        quantity,
        unit,
      }));
      dispatch(fetchStock());
      navigate('/');
    } else {
      setShowError(true);
    }
  };
  return (
    <div className="form-container">
      <h1 className="main-heading"> Mevcut Ürünü Düzenle</h1>
      <Form className="d-flex flex-column stock-form" onSubmit={(e) => handleSubmit(e)}>
        <StockDropdown menu={stock} handleClick={(e) => setId(e.target.value)} />
        <Form.Group required>
          <Form.Label>İsim</Form.Label>
          <Form.Control type="text" placeholder="Yeni ürün ismi" onBlur={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group required>
          <Form.Label>Miktar</Form.Label>
          <Form.Control type="text" placeholder="Miktar" onBlur={(e) => setQuantity(Number(e.target.value))} />
        </Form.Group>
        <Form.Group required>
          <Form.Label>Birim</Form.Label>
          <Form.Select id="dd_stock_unit" onChange={(e) => setUnit(e.target.value)}>
            <option value={null}>Seçiniz</option>
            <option>Adet</option>
            <option>Kg</option>
            <option>Lt</option>
          </Form.Select>
        </Form.Group>
        {showError && <Alert variant="danger">Lütfen gerekli yerleri doldurunuz.</Alert>}
        <Button variant="info" type="submit" className="mt-3">
          Kaydet
        </Button>
      </Form>
    </div>
  );
};

export default UpdateItem;
