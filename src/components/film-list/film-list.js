import React, { Fragment } from "react";
import FilmItem from "../film-item/film-item";
import "../film-list/film-list.css";

const FilmList = (props) => {
  const elements = props.movies.map(({ id, ...allMovies }) => (
    <Fragment key={id}>
      <FilmItem {...allMovies} el={props.toRaiting} id={id} />
    </Fragment>
  ));

  return <ul className="film-container">{elements}</ul>;
};

export default FilmList;
