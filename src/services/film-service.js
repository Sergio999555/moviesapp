export default class ApiService {
  baseUrl = "https://api.themoviedb.org/3/";
  apiKey = "5582aa6ba898b3bd594368f221544cd3";

  getFilmsList = (url) => {
    return fetch(url).then((res) => {
      if (!res.ok) throw new Error("Error");
      return res.json();
    });
  };

  getFilmSearch(inputValue, startPage) {
    return this.getFilmsList(
      `${this.baseUrl}search/movie?api_key=${this.apiKey}&query=${inputValue}&page=${startPage}`
    );
  }

  getGenresList = () => {
    return this.getFilmsList(
      `${this.baseUrl}genre/movie/list?api_key=${this.apiKey}`
    );
  };
}
