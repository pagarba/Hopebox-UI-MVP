
import React from 'react'

import {
  Table,
  TableBody,
  TableCol,
  TableColHead,
  TableHead,
  TableRow,
} from '../Table'

export default class Component extends React.Component {
  static defaultProps = {
    cols: [],
    rows: [],
  }

  render() {
    if (!this.props.rows.length) {
      return (
        <table key="actual-table">
          <TableHead>
            <TableRow>
              {this.props.cols.map(col => (
                <TableColHead key={col.name}>{col.text}</TableColHead>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCol colSpan={this.props.cols.length}>
                There are no items to display.
              </TableCol>
            </TableRow>
          </TableBody>
        </table>
      )
    }

    return (
      <Table
        cols={this.props.cols}
        key="manage-table"
        rows={this.props.rows} />
    )
  }
}
