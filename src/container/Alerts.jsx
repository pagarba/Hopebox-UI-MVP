
import {connect} from 'react-redux'
import React from 'react'

import {createAlert, deleteAlert} from '../common/Actions'

import Alert from '../component/Alert'

class Alerts extends React.Component {
  render() {
    return (
      <div className="alerts">
        {this.props.alerts.map(alert => (
          <Alert
            key={alert.id}
            message={alert.message}
            onClick={this.handleDelete} />
        ))}
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  handleCreate: v => dispatch(createAlert(v)),
  handleDelete: id => dispatch(deleteAlert(id)),
})

const mapState = state => ({
  alerts: state.alerts,
})

export default connect(mapState, mapDispatch)(Alerts)
