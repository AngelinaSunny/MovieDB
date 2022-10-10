import { Space } from 'antd';
import PropTypes from 'prop-types';

import CardMovie from '../CardMovie/CardMovie';
import './CardList.css';

const CardList = ({ cards, genres, guestSession }) => {
  CardList.defaultProps = {
    cards: [{}],
    genres: [{}],
    guestSession: '',
  };

  CardList.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object),
    genres: PropTypes.arrayOf(PropTypes.object),
    guestSession: PropTypes.string,
  };

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
        <div className="empty">{emptyResult}</div>
      ) : (
        <Space className="space" size={35}>
          {items}
        </Space>
      )}
    </div>
  );
};

export default CardList;
