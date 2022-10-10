import { Tag } from 'antd';
import PropTypes from 'prop-types';
import './Tags.css';

const Tags = ({ tags }) => {
  Tags.defaultProps = {
    tags: [],
  };

  Tags.propTypes = {
    tags: PropTypes.array,
  };
  const tag = tags.map((item) => (
    <Tag className="card-tag" key={item.id}>
      {item.name}
    </Tag>
  ));
  return <div className="tags">{tag}</div>;
};

export default Tags;
