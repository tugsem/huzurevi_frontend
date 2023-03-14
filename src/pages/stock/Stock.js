import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import {
  removeStock, selectAllStock, getStockStatus, getStockError,
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
    <div className="d-flex flex-column w-75">
      <h1 className="main-heading">Mevcut Kayıtlar</h1>
      <div className="d-flex justify-content-between my-3 ">

        <a href="new"><Button variant="info" type="submit">Düzenle</Button></a>
        <a href="update"><Button variant="info" type="submit">Veri Girişi</Button></a>

        <a href="logs"><Button variant="primary" type="submit">Kayıtlar</Button></a>
      </div>
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

export default Stock;
