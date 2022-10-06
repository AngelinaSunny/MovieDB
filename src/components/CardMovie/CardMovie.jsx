import { Card, Typography, Image, Rate } from 'antd';
import React, { useState } from 'react';
import { format } from 'date-fns';

import Tags from '../Tags';
import Services from '../../servicesMovie';

import Noimage from './noimage.jpeg';
import './CardMovie.css';

const CardMovie = (props) => {
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

  const description = (textTitle) => {
    const len = textTitle.length;
    const lenTag = props.tags.length;
    let textLength = 135;
    if (len >= 36 && lenTag > 3) {
      textLength = 30;
    } else if (len >= 36 && lenTag <= 3) {
      textLength = 80;
    } else if ((len < 36 && len > 18 && lenTag > 3) || (len >= 18 && lenTag > 3)) {
      textLength = 95;
    } else if ((len < 36 && len > 18 && lenTag <= 3) || (len > 18 && lenTag > 3)) {
      textLength = 110;
    } else if (len <= 18 && lenTag > 3) {
      textLength = 125;
    }

    return `${overview.slice(0, overview.indexOf(' ', textLength))}${overview.length > textLength && '...'}`;
  };

  return (
    <Card style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)' }}>
      <Image src={posterPath ? url : Noimage} alt={props.original_title} />
      {/* <Col> */}
      <div className="header-card" style={{ display: 'flex', justifyContent: 'space-around' }}>
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

      <Text type="secondary" style={{ marginBottom: '7px' }}>
        {date}
      </Text>
      <Tags tags={tags} key={id} id={id} />
      <p>{description(desc)}</p>
      <Rate
        allowHalf
        count={10}
        defaultValue={myRating || 0}
        onChange={(value) => {
          setCurrentValue(value);
          services.postRate(guestSession, id, value);
        }}
        value={myRating || currentValue}
        style={{ fontSize: '16px' }}
      />
      {/* </Col> */}
    </Card>
  );
};

export default CardMovie;
