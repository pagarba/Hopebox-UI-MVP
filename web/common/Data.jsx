
import C from './Constants'
import faker from 'faker'
import {get} from './Utils'

faker.locale = 'en_US'

const imsi = () => {
  let mac = faker.fake('{{internet.mac}}')
  mac = mac.replace(/:/g, '')
  if (mac.length % 2 !== 0) mac += '0'
  mac = Buffer.from(mac, 'hex')
  return mac.join('')
}

const latLon = (radius = 10000) => {
  let [lat, lon] = C.MAP.POSITION
  const x0 = lon - C.MAP.OFFSET;
  const y0 = lat - C.MAP.OFFSET;
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

const max = {
  bts: 3,
  locations: 9,
  hazards: 6,
  vehicles: 4,
  responders: 45,
  users: 500,
}

const nums = [];
for(let i = 1; i <= 1000; i++) nums.push(i)

const rand = n => Math.floor(Math.random() * n)

const ranges = [22]

const startup = {
  bts: 0,
  locations: 0,
  hazards: 0,
  vehicles: 2,
  responders: 12,
  users: 0,
}

const types = {
  locations: [1, 2, 3, 4, 5, 6], // safe, medical, food, water, police, military
  hazards: [1, 2, 3, 4, 5, 6, 7], // fire, flooding, hazmat, gas, unsafe, fallen, people
  vehicles: [1, 2, 3, 4, 5, 6], // bus, medical, food, fire, police, aerial
  responders: [1, 2], // normal, user
  users: [1, 2, 3, 4, 5], // esi
}

export default {
  bts: () => [
    {
      id: 1,
      angle: {start: 250, stop: 285},
      lat: C.MAP.POSITION[0] - 0.000,
      lon: C.MAP.POSITION[1] - 0.001,
      freq: C.BTS.FREQUENCIES[rand(C.BTS.FREQUENCIES.length)],
      power: rand(100),
      range: ranges[rand(ranges.length)],
    },
    {
      id: 2,
      angle: {start: 220, stop: 255},
      lat: C.MAP.POSITION[0] - 0.0005,
      lon: C.MAP.POSITION[1] - 0.001,
      freq: C.BTS.FREQUENCIES[rand(C.BTS.FREQUENCIES.length)],
      power: rand(100),
      range: ranges[rand(ranges.length)],
    },
    {
      id: 3,
      angle: {start: 190, stop: 225},
      lat: C.MAP.POSITION[0] - 0.001,
      lon: C.MAP.POSITION[1] - 0.0005,
      freq: C.BTS.FREQUENCIES[rand(C.BTS.FREQUENCIES.length)],
      power: rand(100),
      range: ranges[rand(ranges.length)],
    },
    {
      id: 4,
      angle: {start: 160, stop: 195},
      lat: C.MAP.POSITION[0] - 0.001,
      lon: C.MAP.POSITION[1] - 0.000,
      freq: C.BTS.FREQUENCIES[rand(C.BTS.FREQUENCIES.length)],
      power: rand(100),
      range: ranges[rand(ranges.length)],
    },
  ],
  cc: () => {
    const v = get(C.KEY.CC)
    if (v) return v

    return {
      id: 1,
      config: false,
      lat: C.MAP.POSITION[0],
      lon: C.MAP.POSITION[1],
      lang: 'en_US',
      ssid: '',
      psk: '',
      measure: 'm', // or km
      notes: '',
    }
  },
  hazards: () => nums.slice(0, max.hazards).map(id => ({
    id,
    ...latLon(5000),
    type: types.hazards[rand(types.hazards.length)],
    notes: faker.fake('{{lorem.sentence}}'),
  })),
  locations: () => nums.slice(0, max.locations).map(id => ({
    id,
    ...latLon(12000),
    type: types.locations[rand(types.locations.length)],
    notes: faker.fake('{{lorem.sentence}}'),
  })),
  responders: () => nums.slice(0, max.responders).map(id => ({
    id,
    name: faker.fake('{{name.lastName}}, {{name.firstName}}'),
    bts: rand(max.bts),
    ...latLon(rand(10000)),
    type: rand(100) >= 90 ? 2 : 1,
    imsi: imsi(),
    msisdn: faker.fake('{{random.number}}'),
    notes: faker.fake('{{hacker.phrase}}'),
    vehicle: rand(100) >= 90 ? rand(max.vehicles) : 0,
    tags: '',
  })),
  startup,
  users: () => nums.slice(0, max.users).map(id => ({
    id,
    esi: types.users[rand(types.users.length)],
    name: faker.fake('{{internet.userName}}'),
    bts: rand(max.bts),
    ...latLon(rand(10000)),
    imsi: imsi(),
    msisdn: faker.fake('{{random.number}}'),
    notes: faker.fake('{{lorem.sentence}}'),
    tags: '',
  })),
  vehicles: () => nums.slice(0, max.vehicles).map(id => ({
    id,
    ...latLon(),
    type: types.vehicles[rand(types.vehicles.length)],
    notes: faker.fake('{{lorem.sentence}}'),
  })),
}
