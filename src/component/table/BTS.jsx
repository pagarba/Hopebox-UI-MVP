
import React from 'react'

import Component from './Component'

export default class BTSTable extends Component {
  static defaultProps = {
    cols: [
      {name: 'idLink', text: 'ID'},
      {name: 'angleRange', text: 'Angle'},
      {name: 'lat', text: 'Latitude'},
      {name: 'lon', text: 'Longitude'},
      {name: 'freq', text: 'Frequency'},
      {name: 'power', text: 'Battery'},
      {name: 'range', text: 'Range'},
    ],
    rows: [],
  }
}
