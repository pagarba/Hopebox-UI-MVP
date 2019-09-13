
import {connect} from 'react-redux'
import React from 'react'

import {setCC} from '../common/Actions'

import SettingsForm from '../component/form/Settings'

class Settings extends React.Component {
  handleSubmit = data => this.props.handleCC({
    id: this.props.cc,
    config: true,
    lat: parseFloat(data.lat),
    lon: parseFloat(data.lon),
    lang: data.lang,
    measure: data.measure,
    ssid: data.ssid,
    psk: data.psk,
    notes: data.notes,
  })

  render() {
    return (
      <div className="settings middle">
        <h3>Settings</h3>
        <SettingsForm onSubmit={this.handleSubmit} />
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  handleCC: v => dispatch(setCC(v)),
})

const mapState = state => ({
  cc: state.cc,
})

export default connect(mapState, mapDispatch)(Settings)
