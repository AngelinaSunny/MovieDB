import { Input, Pagination } from 'antd';

import CardList from '../CardsList';
import Loader from '../Loader';

const tabSearch = (
  isLoaded,
  search,
  cards,
  genres,
  guestSession,
  totalPages,
  sevSearch,
  onChangeSearch,
  movieService
) => {
  if (!isLoaded) {
    return <Loader />;
  }
  return (
    <>
      <Input className="input-search" onChange={onChangeSearch} placeholder="Type to search..." value={search} />
      <CardList className="card-list" cards={cards} genres={genres} guestSession={guestSession} />
      <Pagination
        className="pagination"
        size="small"
        total={totalPages}
        defaultCurrent={1}
        showSizeChanger={false}
        hideOnSinglePage
        onChange={(page) => {
          movieService(sevSearch, page);
        }}
      />
    </>
  );
};

export default tabSearch;
