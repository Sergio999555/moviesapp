import React from "react";
import FilmService from "../../services/film-service";
import FilmList from "../film-list/film-list";

import "../app/app.css";

export default class App extends React.Component {
  filmsService = new FilmService();

  state = {
    filmsResult: [],
  };

  constructor() {
    super();
    this.searchFilms();
  }

  searchFilms = () => {
    this.filmsService.getFilmSearch("return").then((item) => {
      item.forEach((film) => {
        this.setState(({ filmsResult }) => {
          const newArr = [...filmsResult, film];
          return {
            filmsResult: newArr,
          };
        });
      });
    });
  };

  render() {
    return <FilmList attribute={this.state.filmsResult} />;
  }
}
