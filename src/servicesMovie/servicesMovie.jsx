export default class ServicesMovie {
  async getServices(url, obj = null) {
    const res = await fetch(url, obj);

    if (!res.ok) {
      throw new Error(res.success);
    }
    return res.json();
  }

  async getMovieServices(text, page) {
    const res = await this.getServices(
      `https://api.themoviedb.org/3/search/movie?api_key=23450e0ebc597819c66d660c4fd8443a&language=en-US&query=${text}&page=${page}`
    );
    return res;
  }

  async guestSession() {
    const res = await this.getServices(
      'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=23450e0ebc597819c66d660c4fd8443a'
    );
    return res;
  }

  async getGenres() {
    const res = await this.getServices(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=23450e0ebc597819c66d660c4fd8443a&language=en-US'
    );
    return res.genres;
  }

  async postRate(key, id, rate) {
    const raw = JSON.stringify({
      value: rate,
    });

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: raw,
    };
    const res = await this.getServices(
      `https://api.themoviedb.org/3/movie/${id}/rating?api_key=23450e0ebc597819c66d660c4fd8443a&guest_session_id=${key}`,
      requestOptions
    );

    console.log('рейтинг отправлен');
    return res;
  }

  async getMyRate(key, page) {
    const res = await this.getServices(
      `https://api.themoviedb.org/3/guest_session/${key}/rated/movies?api_key=23450e0ebc597819c66d660c4fd8443a&language=en-US&sort_by=created_at.asc&page=${page}`
    );
    console.log(res);
    return res;
  }
}
