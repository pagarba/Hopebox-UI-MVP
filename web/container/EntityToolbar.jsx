
import C from '../common/Constants'
import {connect} from 'react-redux'
import React from 'react'

import {setModal} from '../common/Actions'

class EntityToolbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleHazard = ev => {
    ev.preventDefault()
    this.props.handleModal(!this.props.modal.hazard, C.MODAL.HAZARD)
  }

  handleLocation = ev => {
    ev.preventDefault()
    this.props.handleModal(!this.props.modal.location, C.MODAL.LOCATION)
  }

  handleResponder = ev => {
    ev.preventDefault()
    this.props.handleModal(!this.props.modal.responder, C.MODAL.RESPONDER)
  }

  handleVehicle = ev => {
    ev.preventDefault()
    this.props.handleModal(!this.props.modal.vehicle, C.MODAL.VEHICLE)
  }

  render() {
    return (
      <div className="toolbar flex flex-row">
        <a href="#" onClick={this.handleHazard}>
          <i className="material-icons">add</i> <span>Hazard</span>
        </a>
        <a href="#" onClick={this.handleLocation}>
          <i className="material-icons">add</i> <span>Location</span>
        </a>
        <a href="#" onClick={this.handleResponder}>
          <i className="material-icons">add</i> <span>Responder</span>
        </a>
        <a href="#" onClick={this.handleVehicle}>
          <i className="material-icons">add</i> <span>Vehicle</span>
        </a>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  handleModal: (v, t) => dispatch(setModal(v, t)),
})

const mapState = state => ({
  modal: state.modal,
})

export default connect(mapState, mapDispatch)(EntityToolbar)
