/* eslint-disable */
import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { selectAllStock } from '../../redux/stock/stockSlice';
import StockDropdown from '../../components/stockDropdown';
import { addStockLog } from '../../redux/stock/stockLogSlice';

const UpdateStock = () => {
  const [stockId, setStockId] = useState(null)
  const [name, setName] = useState(null);
  const[quantity, setQuantity] = useState(null);
  const [givenTo, setGivenTo] = useState('');
  const [operation, setOperation] = useState(null);
  const [error, setError] = useState(false)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stock = useSelector(selectAllStock);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(quantity){
       dispatch(addStockLog({
          stock_id: stockId,
          stock_name: name,
          quantity,
          to_whom: givenTo,
          operation
        }));
        navigate('/')
      } else {
     setError(true);
    }
  }
  const handleItemName = (e) => {
    let id = e.target.selectedIndex;
    let stock_name = e.target[id].text;
    setStockId(e.target.value);
    setName(stock_name);
  }

  return (
    <div className="form-container">
      {error &&
      <Alert variant='danger'>
          Lütfen miktar giriniz.
        </Alert>}
      <h1>Veri Girişi</h1>
    <Form className="d-flex flex-column stock-form" onSubmit={(e) => handleSubmit(e)}>
        <StockDropdown menu={stock} handleClick={(e) => handleItemName(e)}/>
        <Form.Group>
          <Form.Label>Miktar</Form.Label>
          <Form.Control type="text" onBlur={(e) => setQuantity(Number(e.target.value))} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Teslim Alan Kişi</Form.Label>
          <Form.Control type="text" onBlur={(e) => setGivenTo(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Operasyon</Form.Label>
          <Form.Select onChange={(e) => setOperation(e.target.value)}>
            <option></option>
            <option value={1}>Veri girişi</option>
            <option value={0}>Veri çıkışı</option>
          </Form.Select>
        </Form.Group>
        <Button variant="info" type="submit">
          Kaydet
        </Button>
      </Form>
      </div>
  );
};
export default UpdateStock;
