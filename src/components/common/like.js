import React from "react";

const Like = props => {
  let classes = "fa-heart fa";

  classes += !props.likes ? "r" : "s";

  return (
    <i
      className={classes}
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
    />
  );
};

export default Like;
