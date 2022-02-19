import React from "react";
import FilmItem from "../film-item/film-item";
import "../film-list/film-list.css";

const FilmList = ({ attribute }) => {
  const elements = attribute.map((item) => {
    return (
      <li className="film-item" key={item.id}>
        <FilmItem {...item} />
      </li>
    );
  });
  return <ul className="film-container">{elements}</ul>;
};

export default FilmList;
