import React from 'react';
import { Tag } from 'antd';

const Tags = ({ tags }) => {
  const tag = tags.map((item) => (
    <Tag
      key={item.id}
      style={{
        border: '1ps solid #D9D9D9',
        borderRadius: '2px',
        color: 'rgba(0, 0, 0, 0.65)',
        background: '#FAFAFA',
        lineHeight: '1.3em',
        height: '20px',
        fontSize: '12px',
        marginBottom: '7px',
      }}
    >
      {item.name}
    </Tag>
  ));
  return <div className="tags">{tag}</div>;
};

export default Tags;
