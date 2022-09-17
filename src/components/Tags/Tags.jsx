import React from 'react';
import { Tag, Space } from 'antd';

const Tags = ({ tags }) => {
  // eslint-disable-next-line react/void-dom-elements-no-children
  const tag = tags.map((item) => (
    <Tag
      key={item.key}
      style={{ border: '1ps solid #D9D9D9', borderRadius: '2px', color: 'rgba(0, 0, 0, 0.65)', background: '#FAFAFA' }}
    >
      {item.value}
    </Tag>
  ));
  return (
    <Space size={8} wrap>
      {tag}
    </Space>
  );
};

export default Tags;
