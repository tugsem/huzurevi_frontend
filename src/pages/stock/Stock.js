/* eslint-disable */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import {
  removeStock, selectAllStock, getStockStatus, getStockError
} from '../../redux/stock/stockSlice';
import './stock.scss';

const Stock = () => {
  const dispatch = useDispatch();

  const stock = useSelector(selectAllStock);
  const stockStatus = useSelector(getStockStatus);
  const error = useSelector(getStockError);

  let content;
  if (stockStatus === 'loading') {
    content = <tr><td>Loading...</td></tr>;
  } else if (stockStatus === 'succeeded') {
    content = stock.map(({
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
    ));
  } else if (stockStatus === 'failed') {
    content = <tr><td>{error}</td></tr>;
  }

  return (
    <section className="stock-list d-flex flex-column w-50 m-5">
      <h1>Mevcut Kayıtlar</h1>
      <div className="d-flex justify-content-between my-3">
        <div>
          <a href="stock/new"><Button variant="info" type="submit">Düzenle</Button></a>
          <a href="stock/update"><Button variant="info" type="submit">Veri Girişi</Button></a>
        </div>
        <a href="stock/logs"><Button variant="info" type="submit">Kayıtlar</Button></a>
      </div>
      <Table className="table-fixed" striped bordered hover>
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
  );
};

export default Stock;
