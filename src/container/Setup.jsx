
import {connect} from 'react-redux'
import React from 'react'
import {withRouter} from 'react-router-dom'

import {setCC, setDemo} from '../common/Actions'

import SettingsForm from '../component/form/Settings'

class Setup extends React.Component {
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
  }).then(() => {
    this.props.handleDemo(true)
    this.props.history.push('/map')
  })

  render() {
    return (
      <div className="setup cover">
        <div className="middle">
          <h3>Setup</h3>
          <p>
            Please configure the Command Center (CC).
          </p>
          <SettingsForm onSubmit={this.handleSubmit} />
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  handleCC: v => dispatch(setCC(v)),
  handleDemo: v => dispatch(setDemo(v)),
})

const mapState = state => ({
  cc: state.cc,
})

export default withRouter(connect(mapState, mapDispatch)(Setup))
