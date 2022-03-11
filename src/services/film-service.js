export default class ApiService {
  baseUrl = "https://api.themoviedb.org/3/";
  apiKey = "5582aa6ba898b3bd594368f221544cd3";

  getFilmsList = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Err");
    return res.json();
  };

  getFilmSearch = (inputValue, startPage) => {
    return this.getFilmsList(
      `${this.baseUrl}search/movie?api_key=${this.apiKey}&query=${inputValue}&page=${startPage}`
    );
  };

  getGenresList = () => {
    return this.getFilmsList(
      `${this.baseUrl}genre/movie/list?api_key=${this.apiKey}`
    );
  };

  senRequest = async (url, value) => {
    try {
      const res = await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          value,
        }),
      });

      if (!res.ok)
        throw new Error(`Could not fetch ${url}, received ${res.status}`);

      try {
        return await res.json();
      } catch (error) {
        throw new Error(`Could not get a JSON object from ${url}`);
      }
    } catch (error) {
      throw new Error("Could not connect to API");
    }
  };

  getSessionId = async () => {
    const data = await this.getFilmsList(
      `${this.baseUrl}authentication/guest_session/new?api_key=${this.apiKey}`
    );
    if (data.success) return (this.guestId = data.guest_session_id);
    return false;
  };

  getRated = () => {
    return this.getFilmsList(
      `${this.baseUrl}guest_session/${this.guestId}/rated/movies?api_key=${this.apiKey}`
    );
  };
  rateMovie = (value, id) => {
    return this.senRequest(
      `${this.baseUrl}movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${this.guestId}`,
      value
    );
  };
}
