
import C from './Constants'

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

// Modal

export const setModal = (payload, type) => dispatch => {
  dispatch({payload, type})
  return Promise.resolve()
}

// Startup

export const setStartup = payload => dispatch => {
  return new Promise(resolve => {
    setTimeout(() => {
      dispatch({payload, type: C.STARTUP})
      resolve()
    }, 5000)
  })
}

export default {
  // Alert
  createAlert,
  deleteAlert,
  // Modal,
  setModal,
  // Startup,
  setStartup,
}
