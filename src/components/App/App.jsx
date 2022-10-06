import React, { Component, Fragment } from 'react';
import { Layout, Input, Pagination, Alert, Spin, Tabs, Space } from 'antd';
import { debounce } from 'lodash';

import ServicesMovie from '../../servicesMovie';
import CardList from '../CardsList';
import './App.css';

export default class App extends Component {
  services = new ServicesMovie();

  debounceMovieService = debounce((val) => this.movieService(val), 400);

  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      isLoaded: false,
      search: '',
      sevSearch: 'return',
      totalPages: null,
      error: null,
      genres: null,
      guestSession: null,
      myRateMovie: [],
      rateTotalPages: null,
      isLoadedRate: false,
    };
  }

  componentDidMount() {
    this.getGenres();
    this.getGuest();
    this.movieService('return');
  }

  onChangeSearch = (e) => {
    this.setState({
      search: e.target.value,
      sevSearch: e.target.value,
    });
    this.debounceMovieService(this.state.search);
  };

  async getGuest() {
    try {
      const guestSession = await this.services.guestSession();
      this.setState({
        guestSession: guestSession.guest_session_id,
      });
    } catch (err) {
      this.setState({
        isLoaded: true,
        error: err,
      });
      throw new Error(err);
    }
  }

  async getGenres() {
    try {
      const genres = await this.services.getGenres();
      this.setState({
        genres,
      });
    } catch (err) {
      this.setState({
        isLoaded: true,
        error: err,
      });
      throw new Error(err);
    }
  }

  async getRatedMovie(key, page = 1) {
    try {
      const myRateMovie = await this.services.getMyRate(key, page);
      this.setState({
        myRateMovie: myRateMovie.results,
        rateTotalPages: myRateMovie.total_pages,
        ratePageSize: myRateMovie.total_results,
        isLoadedRate: true,
      });
    } catch (err) {
      this.setState({
        isLoadedRate: true,
        error: err,
      });
      throw new Error(err);
    }
  }

  async movieService(text, page = 1) {
    try {
      const resultObj = await this.services.getMovieServices(text, page);

      this.setState({
        cards: resultObj.results,
        isLoaded: true,
        totalPages: resultObj.total_pages,
      });
    } catch (err) {
      this.setState({
        isLoaded: true,
        error: err,
      });
      throw new Error(err);
    }
  }

  render() {
    const { Content } = Layout;
    const {
      error,
      isLoaded,
      cards,
      search,
      sevSearch,
      totalPages,
      genres,
      guestSession,
      myRateMovie,
      rateTotalPages,
      isLoadedRate,
      ratePageSize,
    } = this.state;

    if (error) {
      return <Alert message="Error" type="error" showIcon description={`Error: ${error}`} />;
    }

    const tabSearch = () => {
      if (!isLoaded) {
        return (
          <div className="example" style={{ width: '150vw', height: '150vh' }}>
            <Space size="middle">
              <Spin size="small" />
              <Spin />
              <Spin size="large" />
            </Space>
          </div>
        );
      }
      return (
        <>
          <Input
            onChange={this.onChangeSearch}
            placeholder="Type to search..."
            value={search}
            style={{ marginBottom: '34px' }}
          />
          <CardList cards={cards} genres={genres} guestSession={guestSession} style={{ marginBottom: '36px' }} />
          <Pagination
            size="small"
            total={totalPages}
            defaultCurrent={1}
            showSizeChanger={false}
            onChange={(page) => {
              this.movieService(sevSearch, page);
            }}
            style={{ margin: '36px auto 17px', textAlign: 'center' }}
          />
        </>
      );
    };

    const tabRated = () => {
      if (!isLoadedRate) {
        return (
          <div
            className="example"
            style={{
              width: '100vw',
              height: '100vh',
            }}
          >
            <Space size="middle">
              <Spin size="small" />
              <Spin />
              <Spin size="large" />
            </Space>
          </div>
        );
      }
      return (
        <>
          <CardList cards={myRateMovie} genres={genres} guestSession={guestSession} style={{ marginBottom: '36px' }} />
          <Pagination
            size="small"
            total={rateTotalPages}
            defaultPageSize={ratePageSize}
            defaultCurrent={1}
            showSizeChanger={false}
            onChange={(page) => {
              this.getRatedMovie(guestSession, page);
            }}
            style={{ margin: '36px auto 17px', textAlign: 'center' }}
          />
        </>
      );
    };
    return (
      <Layout style={{ maxWidth: '1440px', margin: 'auto', backgroundColor: '#E5E5E5' }}>
        <Content>
          <Tabs
            defaultActiveKey="1"
            centered
            onChange={(key) => {
              if (key === '2') {
                this.getRatedMovie(guestSession);
              }
            }}
            items={[
              {
                label: 'Search',
                key: '1',
                children: tabSearch(),
              },
              {
                label: 'Rated',
                key: '2',
                children: tabRated(),
              },
            ]}
          />
        </Content>
      </Layout>
    );
  }
}
