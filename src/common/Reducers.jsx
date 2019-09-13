
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
  if (type === C.BTSS) {
    return [...payload]
  } else if (type === C.BTS.CREATE) {
    return [...state, {...payload}]
  } else if (type === C.BTS.DELETE) {
    return state.filter(o => o.id !== payload)
  } else if (type === C.BTS.UPDATE) {
    return state.map(o => {
      if (o.id === payload.id) return {...payload}
      return o
    })
  }
  return state
}

const cc = (state = Data.cc(), {payload, type}) => {
  if (type === C.CC.SET) {
    return {...payload}
  }
  return state
}

const data = (state = null, {payload, type}) => {
  if (type === C.DATA) {
    return {...payload}
  }
  return state
}

const hazards = (state = Data.hazards(), {payload, type}) => {
  if (type === C.HAZARDS) {
    return [...payload]
  } else if (type === C.HAZARD.CREATE) {
    return [...state, {...payload}]
  } else if (type === C.HAZARD.DELETE) {
    return state.filter(o => o.id !== payload)
  } else if (type === C.HAZARD.UPDATE) {
    return state.map(o => {
      if (o.id === payload.id) return {...payload}
      return o
    })
  }
  return state
}

const locations = (state = Data.locations(), {payload, type}) => {
  if (type === C.LOCATIONS) {
    return [...payload]
  } else if (type === C.LOCATION.CREATE) {
    return [...state, {...payload}]
  } else if (type === C.LOCATION.DELETE) {
    return state.filter(o => o.id !== payload)
  } else if (type === C.LOCATION.UPDATE) {
    return state.map(o => {
      if (o.id === payload.id) return {...payload}
      return o
    })
  }
  return state
}

const modal = (state = {
  bts: false,
  hazard: false,
  location: false,
  responder: false,
  user: false,
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
    case C.MODAL.USER:
      return {...state, user: payload}
    case C.MODAL.VEHICLE:
      return {...state, vehicle: payload}
    default:
      return state
  }
}

const responders = (state = Data.responders(), {payload, type}) => {
  if (type === C.RESPONDERS) {
    return [...payload]
  } else if (type === C.RESPONDER.CREATE) {
    return [...state, {...payload}]
  } else if (type === C.RESPONDER.DELETE) {
    return state.filter(o => o.id !== payload)
  } else if (type === C.RESPONDER.UPDATE) {
    return state.map(o => {
      if (o.id === payload.id) return {...payload}
      return o
    })
  }
  return state
}

const startup = (state = true, {payload, type}) => {
  if (type === C.STARTUP) return payload
  return state
}

const users = (state = Data.users(), {payload, type}) => {
  if (type === C.USERS) {
    return [...payload]
  } else if (type === C.USER.CREATE) {
    return [...state, {...payload}]
  } else if (type === C.USER.DELETE) {
    return state.filter(o => o.id !== payload)
  } else if (type === C.USER.UPDATE) {
    return state.map(o => {
      if (o.id === payload.id) return {...payload}
      return o
    })
  }
  return state
}

const vehicles = (state = Data.vehicles(), {payload, type}) => {
  if (type === C.VEHICLES) {
    return [...payload]
  } else if (type === C.VEHICLE.CREATE) {
    return [...state, {...payload}]
  } else if (type === C.VEHICLE.DELETE) {
    return state.filter(o => o.id !== payload)
  } else if (type === C.VEHICLE.UPDATE) {
    return state.map(o => {
      if (o.id === payload.id) return {...payload}
      return o
    })
  }
  return state
}

export default combineReducers({
  alerts,
  bts,
  cc,
  data,
  hazards,
  locations,
  modal,
  responders,
  startup,
  users,
  vehicles,
})
