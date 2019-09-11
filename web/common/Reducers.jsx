
import C from './Constants'
import {combineReducers} from 'redux';
import Data from './Data'

const alerts = (state = [], {payload, type}) => {
  if (type === C.ALERT.CREATE) {
    return [...state, {...payload}]
  } else if (type === C.ALERT.DELETE) {
    return state.filter(o => o.id !== payload)
  }
  return state
}

const bts = (state = Data.bts(), {payload, type}) => {
  if (type === C.BTS) return [...payload]
  return state
}

const cc = (state = Data.cc(), {payload, type}) => {
  if (type === C.RESPONDERS) return [...payload]
  return state
}

const hazards = (state = Data.hazards(), {payload, type}) => {
  if (type === C.HAZARDS) return [...payload]
  return state
}

const locations = (state = Data.locations(), {payload, type}) => {
  if (type === C.LOCATIONS) return [...payload]
  return state
}

const modal = (state = {
  bts: false,
  hazard: false,
  location: false,
  responder: false,
  vehicle: false,
}, {payload, type}) => {
  switch (type) {
    case C.MODAL.BTS:
      return {...state, bts: payload}
    case C.MODAL.HAZARD:
      return {...state, hazard: payload}
    case C.MODAL.LOCATION:
      return {...state, location: payload}
    case C.MODAL.RESPONDER:
      return {...state, responder: payload}
    case C.MODAL.VEHICLE:
      return {...state, vehicle: payload}
    default:
      return state
  }
}

const responders = (state = Data.responders(), {payload, type}) => {
  if (type === C.RESPONDERS) return [...payload]
  return state
}

const startup = (state = true, {payload, type}) => {
  if (type === C.STARTUP) return payload
  return state
}

const users = (state = Data.users(), {payload, type}) => {
  if (type === C.USERS) return [...payload]
  return state
}

const vehicles = (state = Data.vehicles(), {payload, type}) => {
  if (type === C.VEHICLES) return [...payload]
  return state
}

export default combineReducers({
  alerts,
  bts,
  cc,
  hazards,
  locations,
  modal,
  responders,
  startup,
  users,
  vehicles,
})
