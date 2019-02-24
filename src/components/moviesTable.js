import React, { Component } from "react";
import Like from "./common/like";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";

class MoviesTable extends Component {
  movieColumns = [
    { type: "title", label: "Title" },
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
      <table className="table">
        <TableHeader
          columns={this.movieColumns}
          sortColumn={sortColumn}
          onSort={onSort}
        />

        <TableBody data={movies} columns={this.movieColumns} />
      </table>
    );
  }
}

export default MoviesTable;
