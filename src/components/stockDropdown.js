/* eslint-disable */
import React from 'react';
import { Form } from 'react-bootstrap';


const StockDropdown = ({menu, handleClick}) => {
   const list = menu.map(({ id, name }) => (
    <option key={id} value={id}>
      {name}
    </option>
  ));
  return (
    <Form.Group>
      <Form.Label>Ürün seçiniz</Form.Label>
      <Form.Select onChange={handleClick}>
        <option value={null}>Seçiniz</option>
        {list}
      </Form.Select>
    </Form.Group>
  );
};

export default StockDropdown;
