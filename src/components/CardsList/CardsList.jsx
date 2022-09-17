import { Space } from 'antd';
import React from 'react';

import CardMovie from '../CardMovie/CardMovie';

const CardList = ({ cards }) => {
  const tags = [
    { key: 101, value: 'detectiv' },
    { key: 102, value: 'action' },
  ];
  const items = cards.map((item) => <CardMovie key={item.id} tags={tags} {...item} />);

  return (
    <div className="space-align-container">
      <Space size={35} style={{ width: '100%', flexWrap: 'wrap' }}>
        {items}
      </Space>
    </div>
  );
};

export default CardList;
