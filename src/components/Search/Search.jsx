import React from 'react';
import { Input } from 'antd';

const SearchInput = ({ onChangeSearch }) => <Input placeholder="Type to search..." onChange={onChangeSearch} />;

export default SearchInput;
