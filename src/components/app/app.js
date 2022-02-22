import React from "react";
import ErrorIndicator from "../error-indicator/error-indicator";
import FilmService from "../../services/film-service";
import FilmList from "../film-list/film-list";
import Header from "../header/header";
import Spinner from "../spinner/spinner";
import "../app/app.css";

export default class App extends React.Component {
  filmsService = new FilmService();

  state = {
    filmsResult: [],
    loading: true,
    error: false,
  };

  constructor() {
    super();
    this.searchFilms();
  }

  searchFilms = () => {
    this.filmsService
      .getFilmSearch("return")
      .then((item) => {
        this.setState({
          filmsResult: [...item],
          loading: false,
        });
      })
      .catch(this.onError);
  };

  onError = () => {
    this.setState = {
      error: true,
      loading: false,
    };
  };

  render() {
    const { loading, error, filmsResult } = this.state;
    const hasData = !(loading || error);
    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <FilmList attribute={filmsResult} /> : null;

    return (
      <>
        <Header />
        {errorMessage}
        {spinner}
        {content}
      </>
    );
  }
}
