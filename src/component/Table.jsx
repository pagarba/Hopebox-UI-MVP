
import React from 'react'

export const TableBody = ({children, ...props}) => (
  <tbody {...props}>{children}</tbody>
)

export const TableCol = ({children, ...props}) => (
  <td {...props}>{children}</td>
)

export const TableColHead = ({children, ...props}) => (
  <th {...props}>{children}</th>
)

export const TableHead = ({children, ...props}) => (
  <thead {...props}>{children}</thead>
)

export const TableRow = ({children, ...props}) => (
  <tr {...props}>{children}</tr>
)

export const Table = props => (
  <table>
    <TableHead>
      <TableRow>
        {props.cols.map(col => (
          <TableColHead key={col.name}>{col.text}</TableColHead>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {props.rows.map(row => (
        <TableRow key={row.id}>
          {props.cols.map(col => (
            <TableCol key={`${row.id}-${col.name}`}>
              {row[col.name]}
            </TableCol>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </table>
)

export default {
  Table,
  TableBody,
  TableCol,
  TableColHead,
  TableHead,
  TableRow,
}
