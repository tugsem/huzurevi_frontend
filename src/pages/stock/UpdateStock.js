import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const UpdateStock = () => {
  const stock = useSelector((state) => state);

  return (
    <section className="m-5 w-50">
      <h1>Veri girişi</h1>
      <Form className="d-flex flex-column">
        <Form.Select>
          <option>Ürün girişi</option>
          <option>Ürün çıkışı</option>
        </Form.Select>
        <Form.Select id="dd_stock_unit" title="Ürün seçiniz">
          {stock.map((item) => (
            <option key={item.id}>{item.name}</option>
          ))}
        </Form.Select>
        <Form.Group>
          <Form.Label>Teslim alan</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Miktar</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Button variant="info" type="submit">
          Kaydet
        </Button>
      </Form>
    </section>
  );
};

export default UpdateStock;
