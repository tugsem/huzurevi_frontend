import React, { useEffect } from 'react';
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
  const dispatch = useDispatch();
  const stockStatus = useSelector(getStockStatus);

  useEffect(() => {
    if (stockStatus === 'idle') {
      dispatch(fetchStock());
    }
  }, [stockStatus, dispatch]);

  return (
    <div className="pt-4">
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="Güncel Stok">
          <StockList />
        </Tab>
        <Tab eventKey="düzenle" title="Düzenle">
          <NewStock />
        </Tab>
        <Tab eventKey="veri girişi" title="Veri Giriş">
          <UpdateStock />
        </Tab>
        <Tab eventKey="kayıtlar" title="Kayıtlar">
          <Logs />
        </Tab>
        <Tab eventKey="Mevcut ürün düzenle" title="Mevcut ürün düzenle">
          <UpdateItem />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Stock;
