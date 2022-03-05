import FilmItem from "../film-item/film-item";
import { Provider } from "../context/context";
import "../film-list/film-list.css";

const FilmList = ({ movies, genres, toLocalStorage, onRated }) => {
  const element = (
    <FilmListView
      movies={movies}
      genres={genres}
      toLocalStorage={toLocalStorage}
      onRated={onRated}
    />
  );

  return <ul className="film-container">{element}</ul>;
};

const FilmListView = ({ movies, toLocalStorage, onRated, genres }) => {
  const parseLocalStorage = () => {
    const result = [];
    const keys = Object.keys(localStorage);
    for (const key of keys) {
      result.push(...JSON.parse(localStorage.getItem(key)));
    }
    return result;
  };

  const renderData = onRated ? parseLocalStorage() : movies;

  const element = renderData.map((item) => {
    const genreName = [];
    const ids = item.genre_ids;

    genres.forEach((item) => {
      for (let i = 0; i < ids.length; i++) {
        if (ids.includes(item.id)) genreName.push(item.name);
        return genreName;
      }
    });

    return (
      <Provider value={genreName} key={item.id}>
        <li className="film-item" key={item.id}>
          <FilmItem
            key={item.id}
            {...item}
            toLocalStorage={toLocalStorage}
            onRated={onRated}
          />
        </li>
      </Provider>
    );
  });
  return <>{element}</>;
};

export default FilmList;
