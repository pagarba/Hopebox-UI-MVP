
// Constants

const self = this

const C = {
  ACTION: {
    BTS: 'action.bts.create',
    HAZARD: 'action.hazard.create',
    LOCATION: 'action.location.create',
    RESPONDER: 'action.responder.create',
    USER: 'action.user.create',
    VEHICLE: 'action.vehicle.create',
  },
  FREQUENCIES: [800, 900, 1800, 1900],
  MAX: {
    BTS: 4,
    HAZARD: 10,
    LOCATION: 5,
    RESPONDER: 50,
    USER: 200,
    VEHICLE: 10,
  },
  OFFSET: 0.0774321,
  POSITION: {lat: 34.052235, lon: -118.243683},
  TYPE: {
    HAZARD: [1, 2, 3, 4, 5, 6, 7], // fire, flooding, hazmat, gas, unsafe, fallen, people,
    LOCATION: [1, 2, 3, 4, 5, 6], // safe, medical, food, water, police, military
    RESPONDER: [1, 2], // normal, user
    USER: [1, 2, 3, 4, 5], // esi
    VEHICLE: [1, 2, 3, 4, 5, 6], // bus, medical, food, fire, police, aerial
  },
}

// Local storage

const btss = new Map()
const hazards = new Map()
const locations = new Map()
const responders = new Map()
const users = new Map()
const vehicles = new Map()

// Local functions

const getGeolocation = (radius = 10000) => {
  let {lat, lon} = C.POSITION
  const x0 = lon - C.OFFSET;
  const y0 = lat - C.OFFSET;
  // Convert Radius from meters to degrees.
  const rd = radius/111300;

  const u = Math.random();
  const v = Math.random();

  const w = rd * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);

  const xp = x/Math.cos(y0);

  lat = y + y0
  lon = xp + x0
  return {lat, lon}
}

const getNumber = (n = 15) => {
  let s = ''
  for (let i = 0; i < n; i++) {
    s += `${getRand(9)}`
  }
  return s
}

const getOther = o => ({
  ...getGeolocation(8000),
  notes: '',
  ...o,
})

const getRand = (n, zero = false) => {
  let r = Math.floor(Math.random() * n)
  if (!zero && r === 0) r = 1
  return r
}

const getTypes = (n = 1) => {
  const ns = []
  for (let i = 0; i < n; i++) {
    ns.push(i + 1)
  }
  return ns
}

// Data functions

const _bts = {
  1: [0.0005, 0.001, 220, 255],
  2: [0.001, 0.0005, 190, 225],
  3: [0.000, 0.001, 250, 285],
  4: [0.001, 0.0, 160, 195],
}
let _btsId = 0
const makeBTS = () => {
  _btsId++
  const id = _btsId
  if (id > C.MAX.BTS) return null
  const {lat, lon} = C.POSITION
  return {
    id,
    lat: lat - _bts[id][0],
    lon: lon - _bts[id][1],
    freq: C.FREQUENCIES[getRand(C.FREQUENCIES.length, false)],
    power: getRand(100),
    range: 22,
    angle: {
      start: _bts[id][2],
      stop: _bts[id][3],
    },
  }
}

let _hazardId = 0
const makeHazard = () => {
  _hazardId++
  const id = _hazardId
  if (id > C.MAX.HAZARD) return null
  return getOther({id, type: getRand(C.TYPE.HAZARD.length, false)})
}

let _locationId = 0
const makeLocation = () => {
  _locationId++
  const id = _locationId
  if (id > C.MAX.LOCATION) return null
  return getOther({id, type: getRand(C.TYPE.LOCATION.length, false)})
}

let _responderId = 0
const makeResponder = () => {
  _responderId++
  const id = _responderId
  if (id > C.MAX.RESPONDER) return null
  return {
    id,
    name: `Responder ${id}`,
    bts: getRand(C.MAX.BTS),
    ...getGeolocation(getRand(10000)),
    imsi: getNumber(),
    msisdn: getNumber(6),
    notes: '',
  }
}

let _userId = 1
const makeUser = () => {
  _userId++
  const id = _userId
  return {
    id,
    esi: getRand(5),
    name: `User ${id}`,
    bts: getRand(C.MAX.BTS),
    ...getGeolocation(getRand(10000)),
    imsi: getNumber(),
    msisdn: getNumber(6),
    notes: '',
  }
}

let _vehicleId = 0
const makeVehicle = () => {
  _vehicleId++
  const id = _vehicleId
  if (id > C.MAX.VEHICLE) return null
  return getOther({id, type: getRand(C.TYPE.VEHICLE.length, false)})
}

// Loop

let timeout = null
const loop = () => {
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(() => {
    self.clients.matchAll().then(clients => {
      const _hazards = []
      if (getRand(10000) % 2 === 0) {
        const o = makeHazard()
        if (o) _hazards.push(o)
      }

      const _locations = []
      if (getRand(10000) % 2 === 0) {
        const o = makeLocation()
        if (o) _locations.push(o)
      }

      const _responders = []
      const responder = makeResponder()
      if (responder) _responders.push(responder)

      const _users = []
      getTypes(getRand(10)).forEach(() => {
        const o = makeUser()
        if (o) _users.push(o)
      })

      const _vehicles = []
      if (getRand(10000) % 2 === 0) {
        const o = makeVehicle()
        if (o) _vehicles.push(o)
      }

      clients.forEach(client => {
        if (client) {
          _hazards.forEach(payload => {
            hazards.set(payload.id, payload)
            client.postMessage({payload, type: C.ACTION.HAZARD})
          })
          _locations.forEach(payload => {
            locations.set(payload.id, payload)
            client.postMessage({payload, type: C.ACTION.LOCATION})
          })
          _responders.forEach(payload => {
            responders.set(payload.id, payload)
            client.postMessage({payload, type: C.ACTION.RESPONDER})
          })
          _users.forEach(payload => {
            users.set(payload.id, payload)
            client.postMessage({payload, type: C.ACTION.USER})
          })
          _vehicles.forEach(payload => {
            vehicles.set(payload.id, payload)
            client.postMessage({payload, type: C.ACTION.VEHICLE})
          })
        }
      })

      if (users.size < C.MAX.USER) loop()
    })
  }, 5000)
}

// Event listeners

self.addEventListener('install', ev => {
  ev.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', ev => {
  ev.waitUntil(self.clients.claim())
})

self.addEventListener('message', ({data}) => {
  console.log('sw data:', data)
  if (data.start && !timeout) {
    timeout = loop()
  } else if (data.type === C.ACTION.USER) {
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        if (client) {
          client.postMessage({payload: {...makeUser(), ...data.payload}, type: C.ACTION.USER})
        }
      })
    })
  }
})
