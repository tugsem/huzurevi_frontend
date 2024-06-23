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
    <div className="stock">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="my-2"
      >
        <Tab eventKey="stocklist" title="Current stock">
          <StockList />
        </Tab>
        <Tab eventKey="addItem" title="Add">
          <NewStock change={handleTabChange} />
        </Tab>
        <Tab eventKey="updateItem" title="Update">
          <UpdateItem change={handleTabChange} />
        </Tab>
        <Tab eventKey="UpdateStock" title="Operation">
          <UpdateStock change={handleTabChange} />
        </Tab>
        <Tab eventKey="Logs" title="Records">
          <Logs />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Stock;
