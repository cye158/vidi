import React from "react";

const MovieForm = ({ history, match }) => {
  return (
    <div>
      <h1>Movie Form {JSON.stringify(match.params)}</h1>
      <button class="btn btn-primary" onClick={() => history.push("/movies")}>
        Save
      </button>
    </div>
  );
};

export default MovieForm;
