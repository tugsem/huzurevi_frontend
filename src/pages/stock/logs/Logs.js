import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import {
  fetchStockLogs, getStockLogs, getStockLogsStatus, removeStockLog,
} from '../../../redux/stock/stockLogSlice';
import './logs.scss';

/* eslint-disable */

const Logs = () => {
  const status = useSelector(getStockLogsStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchStockLogs());
    }
  }, [status, dispatch]);

  const stockLogs = useSelector(getStockLogs);
  console.log(stockLogs)
  let content;
  if (status === 'loading') {
    content = <tr><td>Loading...</td></tr>;
  } else if (status === 'succeeded') {
    content = stockLogs.map(({
      id, stock_name, quantity, to_whom, created_at
    }) => (
      <tr key={id}>
        <td>{stock_name}</td>
        <td>{quantity}</td>
        <td>
          {to_whom}
        </td>
        <td className="d-flex justify-content-between">
          {created_at.substring(0, 10)}
          {<Button variant="danger" type="submit" onClick={() => dispatch(removeStockLog(id))}>Kaldır</Button>}
        </td>
      </tr>
    ));
  } else if (status === 'failed') {
    content = <tr><td>{error}</td></tr>;
  }

  return (
    <div className='stock-logs w-75'>
      <h1>Kayıtlar</h1>
       <Table className="table-fixed" striped bordered hover>
        <thead>
          <tr>
            <th>Ürün</th>
            <th>Miktar</th>
            <th>Teslim Edilen</th>
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
