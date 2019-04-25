import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="query"
      value={value}
      className="form-control my-2"
      onChange={e => onChange(e.currentTarget.value)}
      placeholder="Search for Movie"
    />
  );
};

export default SearchBox;
