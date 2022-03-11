import React from "react";
import FilmService from "../../services/film-service";
import FilmList from "../film-list/film-list";
import Search from "../search/search";
import Spinner from "../spinner/spinner";
import PaginationPage from "../pagination/pagination";
import { Provider } from "../context/context";
import { Alert, Row, Tabs } from "antd";
import "../app/app.css";

export default class App extends React.Component {
  filmService = new FilmService();

  state = {
    movies: [],
    loading: true,
    error: false,
    inputValue: "return",
    totalPages: null,
    currentPages: 1,
    genresList: 1,
    noResult: false,
    filmsRated: null,
    rating: {},
  };

  componentDidMount = () => {
    this.getGenres();

    this.searchFilms();
    this.filmService.getSessionId();
  };

  componentDidUpdate(prevState) {
    if (
      this.state.inputValue !== prevState.inputValue ||
      this.state.currentPages !== prevState.currentPages
    ) {
      this.searchFilms();
    }
  }

  searchFilms = () => {
    const { inputValue, currentPages } = this.state;
    this.filmService
      .getFilmSearch(inputValue, currentPages)
      .then((item) => {
        this.setState({
          movies: item.results,
          loading: false,
          totalPages: item.total_pages,
          noResult: !item.results.length,
        });
      })
      .catch(this.onError);
  };

  getGenres = () => {
    this.filmService.getGenresList().then((item) => {
      this.setState({
        genresList: [...item.genres],
      });
    });
  };

  onError = () => {
    this.setState = {
      error: true,
      loading: false,
    };
  };

  switchPage = (currentPages) => {
    this.setState({ currentPages: currentPages });
  };

  searchResult = (text) => {
    if (text === "") text = "return";
    this.setState({ inputValue: text });
    this.switchPage();
  };

  toRaiting = (value, id) => {
    this.filmService.rateMovie(value, id).then(() => {
      this.filmService.getRated().then((el) => {
        this.setState({
          filmsRated: el.results,
          rating: { ...this.state.rating, [id]: value },
        });
      });
    });
  };

  render() {
    const {
      movies,
      onError,
      inputValue,
      totalPages,
      currentPages,
      genresList,
      noResult,
      loading,
      filmsRated,
      rating,
    } = this.state;

    const { TabPane } = Tabs;

    if (!navigator.onLine)
      <Alert
        message="Соединение было прервано. Попробуйте подключится к интернету"
        type="warning"
        className="alert"
      />;

    if (onError) {
      <Alert
        className="error__alert"
        message="Что-то пошло не так, мы уже исправляем эту ошибку. Пожалуйста, попробуйте обновить страницу"
        type="error"
      />;
    }

    const { searchResult, switchPage } = this;
    const hasData = !(loading || onError || noResult);
    const noResultAlrt = noResult ? (
      <Alert
        message="404 NOT FOUND :("
        type="error"
        className="alert__container"
      />
    ) : null;

    const errRate = <p>У Вас нет оцененных фильмов</p>;
    const spinner = loading ? <Spinner /> : null;

    const content = hasData ? (
      <FilmList
        movies={movies.map((film) => {
          if (rating[film.id]) film.rating = rating[film.id];
          return film;
        })}
        toRaiting={this.toRaiting}
      />
    ) : null;

    const search = (
      <Search searchResult={searchResult} inputValue={inputValue} />
    );

    const pagination = !(noResult || loading) ? (
      <PaginationPage
        totalPages={totalPages}
        currentPages={currentPages}
        switchPage={switchPage}
      />
    ) : null;

    const ratedFilmList = filmsRated ? (
      <FilmList movies={filmsRated} />
    ) : (
      errRate
    );

    return (
      <Provider value={genresList}>
        <Tabs
          defaultActiveKey="1"
          className="tabs__container"
          onChange={this.onChangeTab}
        >
          <TabPane tab="Search" key="1">
            <Row>
              {search}
              {noResultAlrt}
              {spinner}
              {content}
              {pagination}
            </Row>
          </TabPane>
          <TabPane tab="Rated" key="2">
            <Row>{ratedFilmList}</Row>
          </TabPane>
        </Tabs>
      </Provider>
    );
  }
}
