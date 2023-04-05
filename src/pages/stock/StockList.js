import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { BsTrash } from 'react-icons/bs';
import { Table } from 'react-bootstrap';
import {
  removeStock, selectAllStock, getStockStatus,
} from '../../redux/stock/stockSlice';
import StockDropdown from '../../components/stockDropdown';

const StockList = () => {
  const dispatch = useDispatch();
  const stock = useSelector(selectAllStock) || [];
  const stockStatus = useSelector(getStockStatus);
  const [filtered, setFiltered] = useState(null);
  /* Pagination */
  const itemsPerPage = 15;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = stock.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(stock.length / itemsPerPage);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % stock.length;
    setItemOffset(newOffset);
  };
  /**/
  let content;
  if (stockStatus === 'loading') {
    content = <tr><td>Loading...</td></tr>;
  } else if (stockStatus === 'succeeded') {
    content = (filtered || currentItems).map(({
      id, name, quantity, unit,
    }) => (
      <tr key={id} className={quantity === 0 ? 'hg-row' : ''}>
        <td>{name}</td>
        <td>{quantity}</td>
        <td className="d-flex justify-content-between align-items-center">
          {unit}
          {quantity === 0
          && <BsTrash className="cursor-pointer" onClick={() => dispatch(removeStock(id))} />}
        </td>
      </tr>
    ));
  }

  const allOption = { name: 'Tümünü gör', value: 'all' };
  const stockList = [allOption, ...stock];

  const handleChange = (name) => {
    let filteredStock;
    if (name === 'Tümünü gör') {
      setFiltered(null);
    } else {
      filteredStock = stock.filter((item) => item.name === name);
    }
    setFiltered(filteredStock);
  };

  return (
    <div className="d-flex flex-column">
      <StockDropdown
        options={stockList.map((item) => ({
          value: item.id,
          name: item.name,
        }))}
        handleClick={({ name }) => handleChange(name)}
      />
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
        <ReactPaginate
          activeClassName="page active"
          className="pagination d-flex justify-content-center gap-2"
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </section>
    </div>
  );
};

export default StockList;
