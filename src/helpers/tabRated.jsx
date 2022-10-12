import { Pagination } from 'antd';

import CardList from '../components/CardsList';
import Loader from '../components/Loader';

const tabRated = (isLoadedRate, myRateMovie, genres, guestSession, rateTotalPages, ratePageSize, getRatedMovie) => {
  if (!isLoadedRate) {
    return <Loader />;
  }
  return (
    <>
      <CardList className="card-list" cards={myRateMovie} genres={genres} guestSession={guestSession} />
      <Pagination
        className="pagination"
        size="small"
        total={rateTotalPages}
        defaultPageSize={ratePageSize}
        defaultCurrent={1}
        showSizeChanger={false}
        hideOnSinglePage
        onChange={(page) => {
          getRatedMovie(guestSession, page);
        }}
      />
    </>
  );
};

export default tabRated;
