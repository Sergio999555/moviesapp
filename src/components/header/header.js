import React from "react";
import "../header/header.css";

export default class Header extends React.Component {
  render() {
    return (
      <div className="header__wrap">
        <div className="header__button-wrap">
          <button type="button" className="button header__button-search">
            Search
          </button>
          <button type="button" className="button header__button__Rated">
            Rated
          </button>
        </div>
        <input
          className="header__input"
          placeholder="Type to search..."
        ></input>
      </div>
    );
  }
}
