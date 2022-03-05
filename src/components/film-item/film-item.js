import React, { Component } from "react";
import { Rate } from "antd";
import { format } from "date-fns";
import { Consumer } from "../context/context";
import "../film-item/film-item.css";

export default class FilmItem extends Component {
  shortText = (text) => {
    const arr = text.split(" ");
    arr.splice(25);
    return `${arr.join(" ")}...`;
  };

  onChangeRate = (stars) => {
    this.props.toLocalStorage(stars, this.props.id);
  };

  getRate = JSON.parse(localStorage.getItem(this.props.id));

  render() {
    const { poster_path, title, release_date, overview, vote_average } =
      this.props;

    const poster = poster_path ? (
      <img
        className="cardWrap__poster"
        alt="poster"
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
      />
    ) : (
      <img
        className="cardWrap__poster"
        alt="poster"
        src={"https://storage.kinoteatr.kz/films/original/0.jpg"}
      />
    );

    const borderStyle = (value) => {
      if (value >= 0 && value <= 3) return { border: "2px solid #E90000" };
      if (value > 3 && value <= 5) return { border: "2px solid #E97E00" };
      if (value > 5 && value <= 7) return { border: "2px solid #E9D100" };
      if (value >= 7) return { border: "2px solid #66E900" };
    };
    const color = borderStyle(vote_average);

    const date = release_date ? (
      format(new Date(release_date), "MMMM dd, yyyy")
    ) : (
      <span>Дата выхода не указана</span>
    );

    return (
      <div className="cardWrap">
        {poster}
        <div className="cardWrap__description">
          <div className="cardWrap__description-header">
            <h3 className="cardWrap__description-title">{title}</h3>
            <div className="cardWrap__description-voteAverage" style={color}>
              {vote_average}
            </div>
          </div>
          <div className="cardWrap__description-releaseDate">
            <span className="cardWrap__description-releaseDate">{date}</span>
          </div>
          <Consumer>
            {(genreName) => {
              const genreList = genreName.map((item) => {
                return (
                  <span className="cardWrap__genre-item" key={item}>
                    {item}
                  </span>
                );
              });
              return (
                <div className="cardWrap__genre-container">{genreList}</div>
              );
            }}
          </Consumer>
          <div className="cardWrap__description-overview">
            {this.shortText(overview)}
          </div>
          <div className="cardWrap__rate-container">
            <Rate
              count={10}
              allowHalf
              onChange={this.onChangeRate}
              defaultValue={this.getRate && this.getRate[0]?.voteStars}
            />
          </div>
        </div>
      </div>
    );
  }
}
