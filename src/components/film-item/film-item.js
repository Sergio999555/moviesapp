import React from "react";
import "../film-item/film-item.css";
import { format } from "date-fns";

export default class FilmItem extends React.Component {
  render() {
    const { poster_path, title, release_date, overview } = this.props;
    return (
      <div className="cardWrap">
        <img
          className="cardWrap__poster"
          alt="poster"
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        />
        <div className="cardWrap__description">
          <h3 className="cardWrap__description--title">{title}</h3>
          <span className="cardWrap__description--releaseDate">
            {format(new Date(release_date), "MMMM dd, yyyy")}
          </span>
          <div className="cardWrap__description--overview">{overview}</div>
        </div>
      </div>
    );
  }
}
