import React, { Component, Fragment } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";

class Movies extends Component {
  state = {
    movies: getMovies()
  };

  handleDelete = mov => {
    const movies = this.state.movies.filter(movie => movie._id !== mov._id);
    this.setState({ movies });
  };

  handleLike = () => {
    console.log(this.state.movies);
  };

  render() {
    const { length: count } = this.state.movies;

    if (count <= 0) return <p>There are no movies in the database</p>;
    return (
      <Fragment>
        <p>Showing {count} of movies in database.</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th />
              <th />
            </tr>
          </thead>

          <tbody>
            {this.state.movies.map(mov => (
              <tr key={mov._id}>
                <td>{mov.title}</td>
                <td>{mov.genre.name}</td>
                <td>{mov.numberInStock}</td>
                <td>{mov.dailyRentalRate}</td>
                <td>
                  <Like likes={mov.likes} onClick />
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(mov)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

export default Movies;
