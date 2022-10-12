import { Card, Typography, Image, Rate } from 'antd';
import { useState } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import Tags from '../Tags';
import Services from '../../servicesMovie';
import cutDescription from '../../helpers/cutDescription';

import Noimage from './noimage.jpeg';

import './CardMovie.css';

const CardMovie = (props) => {
  CardMovie.defaultProps = {
    id: null,
    title: 'Нет названия',
    overview: 'Скоро здесь будет описание',
    guestSession: null,
    vote_average: 0,
  };

  CardMovie.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    overview: PropTypes.string,
    guestSession: PropTypes.string,
    vote_average: PropTypes.number,
  };

  const { Title, Text } = Typography;
  const [currentValue, setCurrentValue] = useState();
  const { tags, id, title, overview, guestSession } = props;
  const posterPath = props.poster_path;
  const url = `https://image.tmdb.org/t/p/w500${posterPath}?api_key=23450e0ebc597819c66d660c4fd8443a`;
  const rating = props.vote_average.toFixed(1);
  const services = new Services();
  const myRating = props.rating;
  let color = '#E9D100';

  if (rating < 3) {
    color = '#E90000';
  } else if (rating >= 3 && rating < 5) {
    color = '#E97E00';
  } else if (rating > 7) {
    color = '#66E900';
  }

  let desc;
  if (title) {
    desc = title;
  } else {
    desc = 'Позже здесь будет описание...';
  }

  let date;
  if (!props.release_date) {
    date = 'Нет данных';
  } else {
    date = format(new Date(props.release_date), 'PP');
  }

  return (
    <Card className="card">
      <Image src={posterPath ? url : Noimage} alt={props.original_title} />
      <div className="header-card">
        <Title level={4}>{title}</Title>
        <div
          className="main-rate"
          style={{
            border: `2px solid ${color}`,
          }}
        >
          {rating}
        </div>
      </div>

      <Text class-name="card-text" type="secondary">
        {date}
      </Text>
      <Tags tags={tags} key={id} id={id} />
      <p>{cutDescription(desc, tags.length, overview)}</p>
      <Rate
        className="card-rate"
        allowHalf
        count={10}
        defaultValue={myRating || 0}
        onChange={(value) => {
          setCurrentValue(value);
          services.postRate(guestSession, id, value);
        }}
        value={myRating || currentValue}
      />
    </Card>
  );
};

export default CardMovie;
