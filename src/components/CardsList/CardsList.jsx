import { Space } from 'antd';
import React from 'react';

import CardMovie from '../CardMovie/CardMovie';

const CardList = ({ cards, genres, guestSession }) => {
  const items = cards.map((item) => {
    let tags = [];

    item.genre_ids.forEach((elem) => {
      genres.forEach((el) => {
        if (el.id === elem && tags.length < 4) {
          tags.push(el);
        }
      });
    });
    return <CardMovie guestSession={guestSession} key={item.id} tags={tags} {...item} />;
  });

  const emptyResult = 'По данному запросу фильмов не найдено';

  return (
    <div className="space-align-container">
      {cards.length === 0 ? (
        <div style={{ width: '1010px', height: '90vh', fontSize: '20px' }}>{emptyResult}</div>
      ) : (
        <Space size={35} style={{ width: '100%', flexWrap: 'wrap', marginLeft: 'auto', marginRight: 'auto' }}>
          {items}
        </Space>
      )}
    </div>
  );
};

export default CardList;
