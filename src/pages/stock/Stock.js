import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import StockList from './StockList';
import NewStock from './NewStock';
import Logs from './logs/Logs';
import UpdateStock from './UpdateStock';
import UpdateItem from './UpdateItem';
import './stock.scss';
import { getStockStatus, fetchStock } from '../../redux/stock/stockSlice';

const Stock = () => {
  const [key, setKey] = useState('stocklist');
  const dispatch = useDispatch();
  const stockStatus = useSelector(getStockStatus);

  useEffect(() => {
    if (stockStatus === 'idle') {
      dispatch(fetchStock());
    }
  }, [stockStatus, dispatch]);

  const handleTabChange = (key) => {
    setKey(key);
  };
  return (
    <div className="pt-4">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="stocklist" title="Güncel Stok">
          <StockList />
        </Tab>
        <Tab eventKey="addItem" title="Ürün Ekle">
          <NewStock change={handleTabChange} />
        </Tab>
        <Tab eventKey="UpdateStock" title="Veri Girişi">
          <UpdateStock change={handleTabChange} />
        </Tab>
        <Tab eventKey="Logs" title="Kayıtlar">
          <Logs />
        </Tab>
        <Tab eventKey="updateItem" title="Mevcut ürün düzenle">
          <UpdateItem change={handleTabChange} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Stock;
