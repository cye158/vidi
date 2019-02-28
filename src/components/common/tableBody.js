import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderContent = (mov, col) => {
    return col.content ? col.content(mov) : _.get(mov, col.type);
  };

  generateKey = (mov, col) => mov._id + (col.type || col.key);

  render() {
    const { data: movies, columns: movieColumns } = this.props;

    return (
      <tbody>
        {movies.map(mov => (
          <tr key={mov._id}>
            {movieColumns.map(col => (
              <td key={this.generateKey(mov, col)}>
                {this.renderContent(mov, col)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
