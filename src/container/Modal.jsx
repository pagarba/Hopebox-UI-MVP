
import C from '../common/Constants'
import {connect} from 'react-redux'
import React from 'react'

import {
  createBTS,
  createHazard,
  createLocation,
  createResponder,
  createVehicle,
  deleteHazard,
  deleteLocation,
  deleteResponder,
  deleteVehicle,
  setData,
  updateBTS,
  updateHazard,
  updateLocation,
  updateResponder,
  updateUser,
  updateVehicle,
  setModal,
} from '../common/Actions'
import {keys} from '../common/Utils'

import BTS from '../component/form/BTS'
import Hazard from '../component/form/Hazard'
import Location from '../component/form/Location'
import Responder from '../component/form/Responder'
import User from '../component/form/User'
import Vehicle from '../component/form/Vehicle'

class Modal extends React.Component {
  handleClose = ev => {
    ev.preventDefault()

    const map = {
      'bts': C.MODAL.BTS,
      'hazard': C.MODAL.HAZARD,
      'location': C.MODAL.LOCATION,
      'responder': C.MODAL.RESPONDER,
      'user': C.MODAL.USER,
      'vehicle': C.MODAL.VEHICLE,
    }

    const modals = keys(this.props.modal)
    for (let i = 0; i < modals.length; i++) {
      const k = modals[i]
      if (this.props.modal[k]) {
        this.props.handleModal(false, map[k])
        break
      }
    }
  }

  handleDelete = (fn, v, t) => this.props.handleDispatch(fn, v).then(this.props.handleModal(false, t))

  handleModal = (fn, v, t) => this.props.handleDispatch(fn, v).then(this.props.handleModal(false, t))

  handleBTS = v => this.handleModal(!v.id ? createBTS : updateBTS, v, C.MODAL.BTS)
  handleHazard = v => this.handleModal(!v.id ? createHazard : updateHazard, v, C.MODAL.HAZARD)
  handleLocation = v => this.handleModal(!v.id ? createLocation : updateLocation, v, C.MODAL.LOCATION)
  handleResponder = v => this.handleModal(!v.id ? createResponder : updateResponder, v, C.MODAL.RESPONDER)
  handleUser = v => this.handleModal(updateUser, v, C.MODAL.USER)
  handleVehicle = v => this.handleModal(!v.id ? createVehicle : updateVehicle, v, C.MODAL.VEHICLE)

  render() {
    let comp = null

    if (this.props.modal.bts) {
      comp = (
        <BTS
          data={this.props.data}
          onDelete={v => this.handleDelete(deleteBTS, v, C.MODAL.HAZARD)}
          onSubmit={this.handleBTS} />
      )
    } else if (this.props.modal.hazard) {
      comp = (
        <Hazard
          data={this.props.data}
          onDelete={v => this.handleDelete(deleteHazard, v, C.MODAL.HAZARD)}
          onSubmit={this.handleHazard} />
      )
    } else if (this.props.modal.location) {
      comp = (
        <Location
          data={this.props.data}
          onDelete={v => this.handleDelete(deleteLocation, v, C.MODAL.LOCATION)}
          onSubmit={this.handleLocation} />
      )
    } else if (this.props.modal.responder) {
      comp = (
        <Responder
          data={this.props.data}
          onDelete={v => this.handleDelete(deleteResponder, v, C.MODAL.RESPONDER)}
          onSubmit={this.handleResponder} />
      )
    } else if (this.props.modal.user) {
      comp = (
        <User
          data={this.props.data}
          onSubmit={this.handleUser} />
      )
    } else if (this.props.modal.vehicle) {
      comp = (
        <Vehicle
          data={this.props.data}
          onDelete={v => this.handleDelete(deleteVehicle, v, C.MODAL.VEHICLE)}
          onSubmit={this.handleVehicle} />
      )
    }

    if (!comp) return comp

    return (
      <div className="modal">
        <div className="content">
          <a className="close" href="#" onClick={this.handleClose}>X</a>
          {comp}
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  handleData: v => dispatch(setData(v)),
  handleDispatch: (fn, v) => dispatch(fn(v)),
  handleModal: (v, t) => dispatch(setModal(v, t)),
})

const mapState = state => ({
  data: state.data,
  modal: state.modal,
})

export default connect(mapState, mapDispatch)(Modal)
