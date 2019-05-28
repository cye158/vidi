import React from "react";

const ListGroup = ({
  genres,
  onGenreSelect,
  selectedGenre,
  textProperty,
  valueProperty
}) => {
  return (
    <ul className="list-group">
      {genres.map(genre => (
        <li
          key={genre[valueProperty]}
          className={
            genre === selectedGenre
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onGenreSelect(genre)}
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
