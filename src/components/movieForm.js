import React from "react";
import Form from "./common/form";
import Joi from "joi";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .label("Title")
      .required(),
    genreId: Joi.string()
      .label("Genre")
      .required(),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      //.positive()
      .label("Number in Stock")
      .required(),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .greater(0)
      .precision(2)
      .label("Daily Rental Rate")
      .required()
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel = mov => {
    return {
      _id: mov._id,
      title: mov.title,
      genreId: mov.genre._id,
      numberInStock: mov.numberInStock,
      dailyRentalRate: mov.dailyRentalRate
    };
  };

  doSubmit = () => {
    saveMovie(this.state.data);

    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "In Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number", "0.1")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
