import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  movieColumns = [
    {
      type: "title",
      label: "Title",
      content: mov => <Link to={`/movies/${mov._id}`}>{mov.title}</Link>
    },
    { type: "genre.name", label: "Genre" },
    { type: "numberInStock", label: "Stock" },
    { type: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: mov => (
        <Like likes={mov.likes} onClick={() => this.props.onLikeToggle(mov)} />
      )
    },
    {
      key: "delete",
      content: mov => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => this.props.onDelete(mov)}
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.movieColumns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={movies}
      />
    );
  }
}

export default MoviesTable;
