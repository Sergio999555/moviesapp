export default class FilmService {
  BASEURL =
    "https://api.themoviedb.org/3/search/movie/?api_key=5582aa6ba898b3bd594368f221544cd3&query=";

  getFilmSearch(searchWord) {
    return fetch(`${this.BASEURL}${searchWord}`)
      .then((res) => res.json())
      .then((res) => res.results)
      .catch((err) => console.log(err));
  }
}

// const film = new FilmService();
// film.getFilmSearch("return").then((item) => {
//   item.forEach((item) => {
//     console.log(item);
//   });
// });
