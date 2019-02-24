import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderContent = (mov, col) => {
    return col.content ? col.content(mov) : _.get(mov, col.type);
  };
  render() {
    const { data: movies, columns: movieColumn } = this.props;

    return (
      <tbody>
        {movies.map(mov => (
          <tr key={mov.id}>
            {movieColumn.map(col => (
              <td>{this.renderContent(mov, col)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
