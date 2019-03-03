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

  showSortIcon = col => {
    const { sortColumn } = this.props;

    return col.type === sortColumn.type ? (
      <i
        className={
          sortColumn.order === "asc" ? "fas fa-sort-up" : "fas fa-sort-down"
        }
      />
    ) : null;
  };

  render() {
    const { columns, sortColumn } = this.props;
    return (
      <thead>
        <tr>
          {columns.map(col => (
            <th
              style={
                col.type === sortColumn.type
                  ? { textDecoration: "underline" }
                  : null
              }
              className="clickable"
              key={col.type || col.key}
              onClick={() => this.raiseSort(col.type)}
            >
              {this.showSortIcon(col)} {col.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
