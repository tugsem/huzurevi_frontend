import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import {
  removeStock, selectAllStock, getStockStatus,
} from '../../redux/stock/stockSlice';

const StockList = () => {
  const dispatch = useDispatch();
  const stock = useSelector(selectAllStock);
  const stockStatus = useSelector(getStockStatus);

  let content;
  if (stockStatus === 'loading') {
    content = <tr><td>Loading...</td></tr>;
  } else if (stockStatus === 'succeeded') {
    content = Array.isArray(stock)
      ? stock.map(({
        id, name, quantity, unit,
      }) => (
        <tr key={id} className={quantity === 0 ? 'hg-row' : ''}>
          <td>{name}</td>
          <td>{quantity}</td>
          <td className="d-flex justify-content-between">
            {unit}
            {quantity === 0
          && <Button variant="danger" type="submit" onClick={() => dispatch(removeStock(id))}>Kaldır</Button>}
          </td>
        </tr>
      )) : null;
  }
  return (
    <div className="d-flex flex-column">
      <h1 className="main-heading">Mevcut Kayıtlar</h1>
      <section className="stock-list">
        <Table className="table-fixed" striped hover bordered>
          <thead>
            <tr>
              <th>Ürün</th>
              <th>Miktar</th>
              <th>Birim</th>
            </tr>
          </thead>
          <tbody>
            {content}
          </tbody>
        </Table>
      </section>
    </div>
  );
};

export default StockList;
