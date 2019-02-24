import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = type => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.type === type) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.type = type;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map(col => (
            <th
              key={col.type || col.key}
              onClick={() => this.raiseSort(col.type)}
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
