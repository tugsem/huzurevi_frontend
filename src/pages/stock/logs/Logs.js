import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { Table, Alert } from 'react-bootstrap';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import {
  fetchStockLogs, getStockLogs, getStockLogsStatus, removeStockLog,
} from '../../../redux/stock/stockLogSlice';
import capitalizeWords from '../../../modules/capitalizeWords';
import StockDropdown from '../../../components/stockDropdown';
import { selectAllStock } from '../../../redux/stock/stockSlice';

/* eslint-disable */

const Logs = () => {
  const dispatch = useDispatch();

  let stock = useSelector(selectAllStock);
  let allOption = {name: "See all", value:"all"}
  let stockList = [allOption, ...stock];

  const stockLogs = useSelector(getStockLogs);
  const status = useSelector(getStockLogsStatus);
  const [showAlert, setShowAlert] = useState(false);
  const [filtered, setFiltered] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  /* Pagination */
  const itemsPerPage = 15;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = (filtered ? filtered : stockLogs).slice(itemOffset, endOffset);
  const pageCount = Math.ceil((filtered ? filtered : stockLogs).length / itemsPerPage);
  /***/
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchStockLogs());
    }
  }, [status, dispatch]);

  const handleDelete = (id) => {
    setItemToDelete(id)
    setShowAlert(true);
  }

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % stockLogs.length;
    setItemOffset(newOffset);
  }

  let content;
  if (status === 'loading') {
    content = <tr><td>Loading...</td></tr>;
  } else if (status === 'succeeded') {
    content = (filtered ? filtered : currentItems).map(({
      id, stock_name, quantity, to_whom, operation, created_at
    }) => (
      <tr key={id}>
        <td>{stock_name}</td>
        <td>{quantity}</td>
        <td>
          {(Boolean(operation) ? "Alınan: " : "Alan: ").concat(capitalizeWords(to_whom))}
        </td>
        <td className="d-flex justify-content-between align-items-center">
          {created_at.substring(0, 10)}
          {<BsTrash className="cursor-pointer" onClick={() => handleDelete(id)} />}
        </td>
      </tr>
    ));
  } else if (status === 'failed') {
    content = <tr><td>{error}</td></tr>;
  }

  const handleChange = (name) => {
    let filteredStock;
    if(name === "See all"){
      setFiltered(null);
    } else {
      filteredStock = stockLogs.filter(log => log.stock_name === name);
    }
    setFiltered(filteredStock);
  };

  return (
    <div className='stock-logs'>
      <div>
        <StockDropdown
          options={stockList.map((item) => ({
            value: item.id,
            name: item.name,
          }) )}
          handleClick={({name}) => handleChange(name)}
          />
      </div>
      {showAlert && (
        <div>
          <Alert className="d-flex justify-content-between align-items-center w-100 mt-1 p-1" variant="danger">
            <span>This item will be destroyed</span>
            <div className="d-flex gap-2">
            <FaCheck
              className="cursor-pointer"
              onClick={() => {
                dispatch(removeStockLog(itemToDelete));
                setShowAlert(false);
              }}
            />
            <FaTimes
              className="cursor-pointer"
              onClick={() =>  {
                setItemToDelete(null);
                setShowAlert(false);
              }}
            />
            </div>
          </Alert>
        </div>
      )}
      <div className="table-container">
        <Table className="table-fixed" striped bordered hover>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Recipient</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {content}
          </tbody>
        </Table>
      </div>
      <ReactPaginate
        activeClassName= "page active"
        containerClassName='pagination d-flex justify-content-around'
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  )
};

export default Logs;
