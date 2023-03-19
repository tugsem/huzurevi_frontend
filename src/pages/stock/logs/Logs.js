import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Alert } from 'react-bootstrap';
import {
  fetchStockLogs, getStockLogs, getStockLogsStatus, removeStockLog,
} from '../../../redux/stock/stockLogSlice';
import capitalizeWords from '../../../modules/capitalizeWords';

/* eslint-disable */

const Logs = () => {
  const status = useSelector(getStockLogsStatus);
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchStockLogs());
    }
  }, [status, dispatch]);

  const handleDelete = (id, e) => {
    if(e.target.innerText === "Onayla") {
      dispatch(removeStockLog(id))
      setShowAlert(false)
      e.target.innerText = "Kaldır"
    } else {
       e.target.innerText = "Onayla";
       setShowAlert(true)
    }
  }
  const stockLogs = useSelector(getStockLogs);
  let content;
  if (status === 'loading') {
    content = <tr><td>Loading...</td></tr>;
  } else if (status === 'succeeded') {
    content = stockLogs.map(({
      id, stock_name, quantity, to_whom, operation, created_at
    }) => (
      <tr key={id}>
        <td>{stock_name}</td>
        <td>{quantity}</td>
        <td>
          {(Boolean(operation) ? "alınan: " : "alan: ").concat(capitalizeWords(to_whom))}
        </td>
        <td className="d-flex justify-content-between">
          {created_at.substring(0, 10)}
          {<Button variant="danger" className="confirm-btn" type="submit" onClick={(e) => handleDelete(id, e)}>Kaldır</Button>}
        </td>
      </tr>
    ));
  } else if (status === 'failed') {
    content = <tr><td>{error}</td></tr>;
  }

  return (
    <div className='stock-logs'>
      <h1>Kayıtlar</h1>
      {showAlert && (
         <Alert variant="danger">Bu item silinecek</Alert>
      )}
       <Table className="table-fixed" striped bordered hover>
        <thead>
          <tr>
            <th>Ürün</th>
            <th>Miktar</th>
            <th>Teslim</th>
            <th>Tarih</th>
          </tr>
        </thead>
        <tbody>
          {content}
        </tbody>
      </Table>
    </div>
  )
};

export default Logs;
