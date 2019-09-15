
import C from './Constants'

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

const rand = n => Math.floor(Math.random() * n)

export default {
  bts: () => [
    {
      id: 1,
      lat: C.MAP.POSITION[0] - 0.000,
      lon: C.MAP.POSITION[1] - 0.001,
      freq: 1900,
      power: rand(100),
      range: 22,
      angle: {
        start: 250,
        stop: 285,
      },
    },
    {
      id: 2,
      lat: C.MAP.POSITION[0] - 0.0005,
      lon: C.MAP.POSITION[1] - 0.001,
      freq: 1900,
      power: rand(100),
      range: 22,
      angle: {
        start: 220,
        stop: 255,
      },
    },
    {
      id: 3,
      lat: C.MAP.POSITION[0] - 0.001,
      lon: C.MAP.POSITION[1] - 0.0005,
      freq: 1900,
      power: rand(100),
      range: 22,
      angle: {
        start: 190,
        stop: 225,
      },
    },
    {
      id: 4,
      lat: C.MAP.POSITION[0] - 0.001,
      lon: C.MAP.POSITION[1] - 0.000,
      freq: 1900,
      power: rand(100),
      range: 22,
      angle: {
        start: 160,
        stop: 195,
      },
    },
  ],
}
