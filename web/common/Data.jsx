
import C from './Constants'
import faker from 'faker'

faker.locale = 'en_US'

const freqs = [800, 900, 1800, 1900]

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

const ranges = [18, 22]

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
      angle: {start: 215, stop: 260},
      lat: C.MAP.POSITION[0] + 0.01,
      lon: C.MAP.POSITION[1] - 0.05,
      freq: freqs[rand(freqs.length)],
      power: rand(100),
      range: ranges[rand(ranges.length)],
    },
    {
      id: 2,
      angle: {start: 180, stop: 250},
      lat: C.MAP.POSITION[0] - 0.02,
      lon: C.MAP.POSITION[1] - 0.025,
      freq: freqs[rand(freqs.length)],
      power: rand(100),
      range: ranges[rand(ranges.length)],
    },
    {
      id: 3,
      angle: {start: 160, stop: 220},
      lat: C.MAP.POSITION[0] - 0.02,
      lon: C.MAP.POSITION[1] + 0.03,
      freq: freqs[rand(freqs.length)],
      power: rand(100),
      range: ranges[rand(ranges.length)],
    },
    {
      id: 4,
      angle: {start: 120, stop: 280},
      lat: C.MAP.POSITION[0] + 0.03,
      lon: C.MAP.POSITION[1] + 0.025,
      freq: freqs[rand(freqs.length)],
      power: rand(100),
      range: ranges[rand(ranges.length)] / 2.0,
    },
  ],
  cc: () => ({
    id: 1,
    config: false,
    lat: C.MAP.POSITION[0],
    lon: C.MAP.POSITION[1],
    lang: 'en_US',
    ssid: '',
    psk: '',
    measure: 'm', // or km
  }),
  hazards: () => nums.slice(0, max.hazards).map(id => ({
    id,
    ...latLon(5000),
    type: types.hazards[rand(types.hazards.length)],
    notes: faker.fake('{{lorem.sentence}}'),
  })),
  locations: () => nums.slice(0, max.locations).map(id => ({
    id,
    ...latLon(15000),
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
    ...latLon(rand(12000)),
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
