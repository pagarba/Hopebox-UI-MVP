
import C from './Constants'
import {set, keys} from './Utils'

// Alert

let alertId = 0
export const createAlert = payload => dispatch => {
  alertId++
  payload.id = alertId
  dispatch({payload, type: C.ALERT.CREATE})
  return Promise.resolve()
}
export const deleteAlert = payload => dispatch => {
  dispatch({payload, type: C.ALERT.DELETE})
  return Promise.resolve()
}

// BTS

export const createBTS = payload => dispatch => {
  dispatch({payload, type: C.BTS.CREATE})
  return Promise.resolve()
}
export const updateBTS = payload => dispatch => {
  dispatch({payload, type: C.BTS.UPDATE})
  return Promise.resolve()
}

// CC

export const setCC = payload => dispatch => {
  set(C.KEY.CC, payload)
  dispatch({payload, type: C.CC.SET})
  return Promise.resolve()
}

// Data

export const setData = v => dispatch => {
  // Cleanup data
  const omit = new Set(['angleRange', 'idLink', 'onClick'])
  let payload = null

  if (v) {
    payload = {}

    keys(v).forEach(k => {
      if (!omit.has(k)) payload[k] = v[k]
    })
  }

  dispatch({payload, type: C.DATA})
  return Promise.resolve()
}

// Hazard

let hazardId = 0
export const createHazard = payload => dispatch => {
  hazardId++
  payload.id = hazardId
  dispatch({payload, type: C.HAZARD.CREATE})
  return Promise.resolve()
}
export const deleteHazard = payload => dispatch => {
  dispatch({payload, type: C.HAZARD.DELETE})
  return Promise.resolve()
}
export const updateHazard = payload => dispatch => {
  dispatch({payload, type: C.HAZARD.UPDATE})
  return Promise.resolve()
}

// Location

let locationId = 0
export const createLocation = payload => dispatch => {
  locationId++
  payload.id = locationId
  dispatch({payload, type: C.LOCATION.CREATE})
  return Promise.resolve()
}
export const deleteLocation = payload => dispatch => {
  dispatch({payload, type: C.LOCATION.DELETE})
  return Promise.resolve()
}
export const updateLocation = payload => dispatch => {
  dispatch({payload, type: C.LOCATION.UPDATE})
  return Promise.resolve()
}

// Modal

export const setModal = (payload, type) => dispatch => {
  dispatch({payload, type})
  if (!payload) dispatch({payload: null, type: C.DATA})
  return Promise.resolve()
}

// Responder

let responderId = 0
export const createResponder = payload => dispatch => {
  responderId++
  payload.id = responderId
  dispatch({payload, type: C.RESPONDER.CREATE})
  return Promise.resolve()
}
export const deleteResponder = payload => dispatch => {
  dispatch({payload, type: C.RESPONDER.DELETE})
  return Promise.resolve()
}
export const updateResponder = payload => dispatch => {
  dispatch({payload, type: C.RESPONDER.UPDATE})
  return Promise.resolve()
}

// Startup

export const setStartup = payload => dispatch => {
  return new Promise(resolve => {
    setTimeout(() => {
      dispatch({payload, type: C.STARTUP})
      resolve()
    }, C.SPLASH)
  })
}

// User

export const createUser = payload => dispatch => {
  dispatch({payload, type: C.USER.CREATE})
  return Promise.resolve()
}
export const updateUser = payload => dispatch => {
  dispatch({payload, type: C.USER.UPDATE})
  return Promise.resolve()
}

// Vehicle

let vehicleId = 0
export const createVehicle = payload => dispatch => {
  vehicleId++
  payload.id = vehicleId
  dispatch({payload, type: C.VEHICLE.CREATE})
  return Promise.resolve()
}
export const deleteVehicle = payload => dispatch => {
  dispatch({payload, type: C.VEHICLE.DELETE})
  return Promise.resolve()
}
export const updateVehicle = payload => dispatch => {
  dispatch({payload, type: C.VEHICLE.UPDATE})
  return Promise.resolve()
}

export default {
  // Alert
  createAlert,
  deleteAlert,
  // BTS
  createBTS,
  updateBTS,
  // CC
  setCC,
  // Hazard
  createHazard,
  deleteHazard,
  updateHazard,
  // Location
  createLocation,
  deleteLocation,
  updateLocation,
  // Modal,
  setModal,
  // Responder
  createResponder,
  deleteResponder,
  updateResponder,
  // Startup,
  setStartup,
  // User
  createUser,
  updateUser,
  // Vehicle
  createVehicle,
  deleteVehicle,
  updateVehicle,
}
