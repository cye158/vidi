import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { paginate } from "../utils/paginate";
import { includesQuery } from "../utils/includesQuery";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import MoviesTable from "./moviesTable";
import SearchBox from "./searchBox";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    searchQuery: "",
    selectedGenre: null,
    currentPage: 1,
    pageSize: 4,
    sortColumn: { type: "title", order: "asc" }
  };

  async componentDidMount() {
    const { data: preGenres } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...preGenres];

    const { data: movies } = await getMovies();

    this.setState({ movies, genres });
  }

  handleDelete = async mov => {
    const prevMovieState = this.state.movies;

    const movies = prevMovieState.filter(m => m._id !== mov._id);
    this.setState({ movies });

    try {
      await deleteMovie(mov._id);
    } catch (e) {
      console.log(e.response);
      if (e.response && e.response.status === 404) {
        toast.error("This movie has already been removed.");
      }
      this.setState({ movies: prevMovieState });
    }
  };

  handleLike = mov => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(mov);
    movies[index] = { ...movies[index] };
    movies[index].likes = !movies[index].likes;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleGenreSelect = genre => {
    this.setState({ searchQuery: "", selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      searchQuery,
      movies: allMovies
    } = this.state;

    let filteredMovies = allMovies;
    if (searchQuery) {
      filteredMovies = allMovies.filter(mov =>
        includesQuery(searchQuery.toLowerCase(), mov.title.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filteredMovies = allMovies.filter(
        mov => mov.genre._id === selectedGenre._id
      );
    }

    const sortedMovies = _.orderBy(
      filteredMovies,
      sortColumn.type,
      sortColumn.order
    );

    const movies = paginate(sortedMovies, currentPage, pageSize);

    return { moviesCount: filteredMovies.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;

    if (count <= 0) return <p>There are no movies in the database</p>;

    const { moviesCount, data } = this.getPageData();

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            genres={this.state.genres}
            selectedGenre={this.state.selectedGenre}
            onGenreSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {user && (
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ margin: 10 }}
            >
              Add New Movie
            </Link>
          )}
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <p>Showing {moviesCount} of movies in database.</p>
          <MoviesTable
            movies={data}
            sortColumn={sortColumn}
            onLikeToggle={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={moviesCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
