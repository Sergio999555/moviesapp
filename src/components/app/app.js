import React, { Component } from "react";
import FilmList from "../film-list/film-list";
import "../app/app.css";
import FilmService from "../../services/film-service";
import Search from "../search/search";
import Spinner from "../spinner/spinner";
import PaginationPage from "../pagination/pagination";
import "antd/dist/antd.min.css";
import { Alert, Tabs } from "antd";

const { TabPane } = Tabs;

export default class App extends Component {
  filmService = new FilmService();

  state = {
    movies: [],
    loading: true,
    error: false,
    inputValue: "return",
    totalPages: null,
    currentPages: 1,
    noResult: false,
    onRated: false,
    localStorageData: [],
    genres: [],
  };

  componentDidMount = () => {
    this.searchFilms();
    this.getGenres();
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
        if (item.length === 0) {
          this.setState({
            error: true,
            totalPages: null,
          });
        }
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
        genres: [...item.genres],
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
    this.setState({
      inputValue: text,
    });
    this.switchPage();
  };

  onChangeTab = (value) => {
    if (value === "2") {
      this.setState({
        onRated: true,
        localStorageData: [...this.parseLocalStorage()],
      });
    } else {
      this.setState({ onRated: false });
    }
  };

  toLocalStorage = (stars, id) => {
    if (stars) {
      const ratedMovies = this.state.movies.reduce((acc, element) => {
        if (element.id === id) {
          element.voteStars = stars;
          acc.push(element);
        }
        return acc;
      }, []);
      localStorage.setItem(id, JSON.stringify(ratedMovies));
    } else {
      localStorage.removeItem(id);
      this.setState(({ localStorageData }) =>
        localStorageData.filter((element) => element.id !== id)
      );
    }
  };

  parseLocalStorage = () => {
    const res = [];
    const keys = Object.keys(localStorage);
    for (const key of keys) {
      res.push(...JSON.parse(localStorage.getItem(key)));
    }

    return res;
  };

  render() {
    const {
      movies,
      onError,
      inputValue,
      totalPages,
      currentPages,
      noResult,
      onRated,
      loading,
      genres,
    } = this.state;

    const { searchResult, switchPage } = this;

    const spinner = loading ? <Spinner /> : null;

    const search = onRated ? null : (
      <Search searchResult={searchResult} inputValue={inputValue} />
    );

    const pagination = !(onRated || noResult) ? (
      <PaginationPage
        totalPages={totalPages}
        currentPages={currentPages}
        switchPage={switchPage}
      />
    ) : null;

    const content = onRated ? (
      <FilmList
        movies={movies}
        toLocalStorage={this.toLocalStorage}
        parseLocalStorage={this.parseLocalStorage}
        onRated={onRated}
        genres={genres}
      />
    ) : (
      <FilmList
        movies={movies}
        toLocalStorage={this.toLocalStorage}
        onRated={onRated}
        genres={genres}
      />
    );

    const tabs = (
      <Tabs
        defaultActiveKey="1"
        className="tabs__container"
        onChange={this.onChangeTab}
      >
        <TabPane tab="Search" key="1" />
        <TabPane tab="Rated" key="2" />
      </Tabs>
    );

    const noResultAlrt = noResult ? (
      <Alert
        message="404 NOT FOUND :("
        type="error"
        className="alert__container"
      />
    ) : null;

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

    return (
      <>
        {tabs}
        {search}
        {noResultAlrt}
        {spinner}
        {content}
        {pagination}
      </>
    );
  }
}
