import { Component } from 'react';
import { Layout, Alert, Tabs } from 'antd';
import { debounce } from 'lodash';

import ServicesMovie from '../../servicesMovie';
import tabSearch from '../helpers/tabSearch';
import tabRated from '../helpers/tabRated';
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

    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.movieService = this.movieService.bind(this);
    this.getRatedMovie = this.getRatedMovie.bind(this);
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

    return (
      <Layout className="layout">
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
                children: tabSearch(
                  isLoaded,
                  search,
                  cards,
                  genres,
                  guestSession,
                  totalPages,
                  sevSearch,
                  this.onChangeSearch,
                  this.movieService
                ),
              },
              {
                label: 'Rated',
                key: '2',
                children: tabRated(
                  isLoadedRate,
                  myRateMovie,
                  genres,
                  guestSession,
                  rateTotalPages,
                  ratePageSize,
                  this.getRatedMovie
                ),
              },
            ]}
          />
        </Content>
      </Layout>
    );
  }
}
