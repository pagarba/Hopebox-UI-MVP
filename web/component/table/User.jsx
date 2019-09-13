
import React from 'react'

import Component from './Component'

export default class UserTable extends Component {
  static defaultProps = {
    cols: [
      {name: 'idLink', text: 'ID'},
      {name: 'name', text: 'Name'},
      {name: 'esi', text: 'ESI'},
      {name: 'bts', text: 'BTS'},
      {name: 'lat', text: 'Latitude'},
      {name: 'lon', text: 'Longitude'},
      {name: 'imsi', text: 'IMSI'},
      {name: 'msisdn', text: 'MSISDN'},
      {name: 'notes', text: 'Notes'},
    ],
    rows: [],
  }
}
