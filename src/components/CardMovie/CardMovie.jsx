import { Space, Typography, Image, Rate } from 'antd';
import React, { useState } from 'react';
import { format } from 'date-fns';

import Tags from '../Tags';

const CardMovie = (props) => {
  const { Title, Text } = Typography;
  const [currentValue, setCurrentValue] = useState(2.5);
  const { tags, id, title, overview } = props;
  const posterPath = props.poster_path;
  const rating = props.vote_average;

  const date = format(new Date(props.release_date), 'PP');

  const description = (textTitle) => {
    let textLength = 110;
    if (textTitle.length <= 20) {
      textLength = 160;
    } else if (textTitle.length < 40) {
      textLength = 120;
    }
    return `${overview.slice(0, overview.indexOf(' ', textLength))}${overview.length > textLength && '...'}`;
  };

  return (
    <div
      className="space-align-block"
      style={{ width: '454px', height: '279px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)' }}
    >
      <Space align="start">
        <Image
          src={`https://image.tmdb.org/t/p/w500${posterPath}?api_key=23450e0ebc597819c66d660c4fd8443a`}
          alt={props.original_title}
          width={183}
          height={279}
        />

        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            height: '279px',
            padding: '10px 10px 20px',
            rowGap: '7px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Title level={4} style={{ marginBottom: '0', marginRight: '7px', width: '200px' }}>
              {title}
            </Title>
            <div
              style={{
                border: '2px solid #E9D100',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                textAlign: 'center',
                verticalAlign: 'middle',
              }}
            >
              {rating}
            </div>
          </div>

          <Text type="secondary">{date}</Text>
          <Tags tags={tags} key={id} />
          <p style={{ marginBottom: '0' }}>{description(title)}</p>
          <Rate
            allowHalf
            count={10}
            defaultValue={2.5}
            onChange={(value) => {
              setCurrentValue(value);
            }}
            value={currentValue}
            style={{ position: 'absolute', bottom: '15px', width: '100%', fontSize: '16px' }}
          />
        </div>
      </Space>
    </div>
  );
};

export default CardMovie;
