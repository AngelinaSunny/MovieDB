import { Input } from 'antd';
import PropTypes from 'prop-types';

const SearchInput = ({ onChangeSearch }) => {
  SearchInput.defaultProps = {
    onChangeSearch: () => console.log('функция onChangeSearch не передана'),
  };

  SearchInput.propTypes = {
    onChangeSearch: PropTypes.func,
  };
  return <Input placeholder="Type to search..." onChange={onChangeSearch} />;
};
export default SearchInput;
