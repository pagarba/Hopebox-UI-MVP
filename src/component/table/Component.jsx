
import React from 'react'

import Pagination from '../Pagination'

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

  static getDerivedStateFromProps(props, state) {
    if (props.rows.length !== state.total) {
      state.total = props.rows.length
      return state
    }
    return null
  }

  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      size: 25,
    }
  }

  handlePage = page => this.setState({page})

  handleSize = size => this.setState({size, page: 0})

  render() {
    if (!this.state.total) {
      return (
        <table>
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

    const start = this.state.page * this.state.size
    let stop = start + this.state.size
    if (stop > this.state.total) stop = this.state.total

    return [
      <Pagination
        key="manage-pagination"
        onPage={this.handlePage}
        onSize={this.handleSize}
        page={this.state.page}
        size={this.state.size}
        total={this.state.total} />,
      <Table
        cols={this.props.cols}
        key="manage-table"
        rows={this.props.rows.slice(start, stop)} />,
    ]
  }
}
