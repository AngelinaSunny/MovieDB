import React from 'react';
import { Input } from 'antd';

const SearchInput = ({ onChangeSearch }) => (
  <form onSubmit={onSubmit}>
    <Input placeholder="Type to search..." onChange={onChangeSearch} />
  </form>
);

export default SearchInput;
