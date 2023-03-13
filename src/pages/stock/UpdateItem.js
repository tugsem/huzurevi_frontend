import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { fetchStock, selectAllStock, updateStockItem } from '../../redux/stock/stockSlice';
import capitalizeWords from '../../modules/capitalizeWords';
import StockDropdown from '../../components/stockDropdown';

/* eslint-disable */


const UpdateItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [id, setId] = useState(null);
  const [name, setName] = useState(null)
  const [quantity, setQuantity] = useState(null)
  const [unit, setUnit] = useState('Adet')

  const stock = useSelector(selectAllStock);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(name) {
      dispatch(updateStockItem({
      id,
      name: capitalizeWords(name),
      quantity,
      unit,
    }))
    } else {
      dispatch(updateStockItem({
        id,
        quantity,
        unit
      }))
    }
    dispatch(fetchStock());
    navigate('/stock')
  }
  return (
  <Form className="d-flex flex-column m-5 w-50" onSubmit={(e) => handleSubmit(e)}>
    <StockDropdown menu={stock} handleClick={(e) => setId(e.target.value)}/>
        <Form.Group>
          <Form.Label>Yeni ürün ismi</Form.Label>
          <Form.Control type="text" onBlur={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Miktar</Form.Label>
          <Form.Control type="text" onBlur={(e) => setQuantity(Number(e.target.value))} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Birim</Form.Label>
          <Form.Select id="dd_stock_unit" onChange={(e) => setUnit(e.target.value)}>
            <option>Adet</option>
            <option>Kg</option>
            <option>Lt</option>
          </Form.Select>
        </Form.Group>
        <Button variant="info" type="submit">
          Kaydet
        </Button>
      </Form>
);
}

export default UpdateItem;
