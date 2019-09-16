
import C from '../common/Constants'
import React from 'react'

import {
  FeatureGroup,
  Marker,
  Polyline,
  Popup,
} from 'react-leaflet'
import {SemiCircle} from 'react-leaflet-semicircle'

const Icon = opts => L.icon({
  iconUrl: C.MAP.MARKER.UNKOWN,
  iconSize: [32, 37],
  ...opts,
})

const IconById = (obj = {}, id = 1) => {
  const keys = Object.keys(obj)
  const iconUrl = keys[id - 1] ? obj[keys[id - 1]] : C.MAP.MARKER.UNKOWN
  return Icon({iconUrl})
}

const keyNameById = (obj = {}, id = 1) => {
  const keys = Object.keys(obj)
  return keys[id - 1] ? keys[id - 1] : 'Unknown'
}

export const BTS = props => (
  <FeatureGroup color={`rgba(100, 100, 255, 0.75)`}>
    <Marker
      icon={Icon({iconUrl: C.MAP.MARKER.BTS})}
      onMoveEnd={props.onMoveEnd}
      position={{lat: props.lat, lon: props.lon}}>
      <Popup>
        <h4>BTS</h4>
        <div>ID: {props.id}</div>
        <div>Frequency: {props.freq}</div>
        <div>Battery: {props.power}</div>
        <div>Range: {props.range || 0}</div>
        <div>Notes: {props.notes}</div>
        <button onClick={() => props.onClick(props)}>MANAGE</button>
      </Popup>
    </Marker>
    <SemiCircle
      position={{lat: props.lat, lon: props.lon}}
      radius={props.range * 1000}
      startAngle={props.angle.start}
      stopAngle={props.angle.stop} />
  </FeatureGroup>
)

export const CC = props => (
  <FeatureGroup color={C.MAP.COLOR.CC}>
    <Marker
      icon={Icon({iconUrl: C.MAP.MARKER.CC, iconSize: [42, 50]})}
      position={{lat: props.lat, lon: props.lon}}>
      <Popup>
        <h4>CC</h4>
        <div>Language: {props.lang}</div>
        <div>Measurement: {props.measure === 'm' ? 'Miles' : 'Kilometers'}</div>
        <div>WiFi: {!!props.ssid ? 'True' : 'False'}</div>
        <div>Notes: {props.notes}</div>
      </Popup>
    </Marker>
    {props.links && props.links.map((link, i) => (
      <Polyline
        attribution={link.attribution}
        key={i}
        positions={[[props.lat, props.lon], link.position]} />
    ))}
  </FeatureGroup>
)

export const Hazard = props => (
  <Marker
    draggable={true}
    icon={IconById(C.MAP.MARKER.HAZARD, props.type)}
    onMoveEnd={props.onMoveEnd}
    position={{lat: props.lat, lon: props.lon}}>
    <Popup>
      <h4>Hazard</h4>
      <div>ID: {props.id}</div>
      <div>Type: {keyNameById(C.MAP.MARKER.HAZARD, props.type)}</div>
      <div>Notes: {props.notes}</div>
      <button onClick={() => props.onClick(props)}>MANAGE</button>
    </Popup>
  </Marker>
)

export const Location = props => (
  <Marker
    draggable={true}
    icon={IconById(C.MAP.MARKER.LOCATION, props.type)}
    onMoveEnd={props.onMoveEnd}
    position={{lat: props.lat, lon: props.lon}}>
    <Popup>
      <h4>Location</h4>
      <div>ID: {props.id}</div>
      <div>Type: {keyNameById(C.MAP.MARKER.LOCATION, props.type)}</div>
      <div>Notes: {props.notes}</div>
      <button onClick={() => props.onClick(props)}>MANAGE</button>
    </Popup>
  </Marker>
)

export const Responder = props => (
  <Marker
    draggable={true}
    icon={Icon({iconUrl: C.MAP.MARKER.RESPONDER})}
    onMoveEnd={props.onMoveEnd}
    position={{lat: props.lat, lon: props.lon}}>
    <Popup>
        <h4>Responder</h4>
        <div>ID: {props.id}</div>
        <div>Name: {props.name}</div>
        <div>BTS: {props.bts}</div>
        <div>IMSI: {props.imsi}</div>
        <div>MSISDN: {props.msisdn}</div>
        <div>Notes: {props.notes}</div>
        <button onClick={() => props.onClick(props)}>MANAGE</button>
    </Popup>
  </Marker>
)

export const User = props => (
  <Marker
    draggable={true}
    icon={Icon({iconUrl: C.MAP.MARKER.USER.replace('{n}', props.esi)})}
    onMoveEnd={props.onMoveEnd}
    position={{lat: props.lat, lon: props.lon}}>
    <Popup>
        <h4>User</h4>
        <div>ID: {props.id}</div>
        <div>Name: {props.name}</div>
        <div>BTS: {props.bts}</div>
        <div>IMSI: {props.imsi}</div>
        <div>MSISDN: {props.msisdn}</div>
        <div>Notes: {props.notes}</div>
        <button onClick={() => props.onClick(props)}>MANAGE</button>
    </Popup>
  </Marker>
)

export const Vehicle = props => (
  <Marker
    draggable={true}
    icon={IconById(C.MAP.MARKER.VEHICLE, props.type)}
    onMoveEnd={props.onMoveEnd}
    position={{lat: props.lat, lon: props.lon}}>
    <Popup>
      <h4>Vehicle</h4>
      <div>ID: {props.id}</div>
      <div>Type: {keyNameById(C.MAP.MARKER.VEHICLE, props.type)}</div>
      <div>Notes: {props.notes}</div>
      <button onClick={() => props.onClick(props)}>MANAGE</button>
    </Popup>
  </Marker>
)

export default {
  BTS,
  CC,
  Hazard,
  Location,
  Responder,
  User,
  Vehicle,
}
