import React, { Component } from 'react';
import { Layout, Input, Pagination, Alert, Spin } from 'antd';

import CardList from '../CardsList';
import './App.css';

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      isLoaded: false,
      search: 'return',
      value: null,
      page: 1,
    };
  }

  componentDidMount() {
    this.movieService('return', 1);
  }

  onChangeSearch = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

  onGetMovieService = () => {
    this.movieService(this.state.search, this.state.page);
    this.setState({
      value: '',
    });
  };

  async movieService(text, page) {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=23450e0ebc597819c66d660c4fd8443a&language=en-US&page=${page}&query=${text}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            cards: result.results,
            isLoaded: true,
          });
          console.log(result.results);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      )
      .catch((err) => {
        throw new Error(err);
      });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const { Content } = Layout;
    const { error, isLoaded, cards } = this.state;
    const { Search } = Input;

    if (error) {
      return <Alert message="Error" type="error" showIcon description={`Error: ${error}`} />;
    }
    if (!isLoaded) {
      return (
        <div
          className="example"
          style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Spin size="large" />
        </div>
      );
    }
    return (
      <Layout style={{ maxWidth: '1440px', margin: 'auto', backgroundColor: '#E5E5E5' }}>
        <Content style={{ maxWidth: '1010px', margin: 'auto', padding: '21px 32px', backgroundColor: '#fff' }}>
          <Search
            placeholder="Type to search..."
            value={this.state.value}
            onChange={this.onChangeSearch}
            onSearch={this.onGetMovieService}
            style={{ marginBottom: '34px' }}
          />
          <CardList cards={cards} style={{ marginBottom: '36px' }} />
          <Pagination
            size="small"
            total={50}
            pageSizeOption="20"
            style={{ margin: '36px auto 17px', width: '204px' }}
          />
        </Content>
      </Layout>
    );
  }
}
