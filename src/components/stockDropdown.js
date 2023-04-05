/* eslint-disable */
import React from 'react';
import Select from 'react-select';

const StockDropdown = ({options, handleClick}) => {
  return (
    <Select
      options={options}
      placeholder="Ürün ara"
      getOptionLabel={option => option.name}
      getOptionValue={option => option.value}
      onChange={(option)=>handleClick({value: option.value, name: option.name })}
      className="my-2"
    />
  );
};

export default StockDropdown;
