import React, { Component } from "react";

class Like extends Component {
  render() {
    let classes = "fa-heart fa";

    classes += !this.props.likes ? "r" : "s";

    return (
      <i
        className={classes}
        onClick={this.props.onLikeToggle}
        style={{ cursor: "pointer" }}
        aria-hidden="true"
      />
    );
  }
}
export default Like;
