
import React from 'react'

import Component from './Component'

export default class LocationTable extends Component {
  static defaultProps = {
    cols: [
      {name: 'idLink', text: 'ID'},
      {name: 'type', text: 'Type'},
      {name: 'lat', text: 'Latitude'},
      {name: 'lon', text: 'Longitude'},
      {name: 'notes', text: 'Notes'},
    ],
    rows: [],
  }
}
