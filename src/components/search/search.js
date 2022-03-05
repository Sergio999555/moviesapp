import React from "react";
import { Input } from "antd";
import { debounce } from "lodash";
import "../search/search.css";

export default class Search extends React.Component {
  state = {
    inputValue: "",
  };

  search = debounce(() => {
    const { searchResult } = this.props;
    const { inputValue } = this.state;
    searchResult(inputValue);
  }, 500);

  onChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
    this.search();
  };

  render() {
    return (
      <div className="input_wrap">
        <Input
          type="text"
          className="input_field"
          onChange={this.onChange}
          placeholder="Type to search..."
          value={this.state.searchQuery}
          autoFocus
        />
      </div>
    );
  }
}
