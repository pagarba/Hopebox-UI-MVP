
import C from '../common/Constants'
import {connect} from 'react-redux'
import React from 'react'
import {set} from '../common/Utils'

import {setData, setDemo, setModal} from '../common/Actions'

import {
  BTS,
  CC,
  Hazard,
  Location,
  Responder,
  User,
  Vehicle,
} from '../component/Map'
import Control from 'react-leaflet-control'
import {
  LayerGroup,
  LayersControl,
  Map,
  TileLayer,
  ZoomControl,
} from 'react-leaflet'
import MeasureControl from 'react-leaflet-measure'

class MapC extends React.Component {
  static defaultProps = {
    users: [],
  }

  static getDerivedStateFromProps(props, state) {
    if (!props.demo) {
      props.handleDemo(true)
    }
    return null
  }

  constructor(props) {
    super(props)
    this.state = {
      measureOptions: {
        position: 'bottomleft',
        primaryLengthUnit: 'feet', //'meters',
        secondaryLengthUnit: 'miles', //'kilometers',
        primaryAreaUnit: 'sqfeet', //'sqmeters',
        secondaryAreaUnit: 'acres',
        activeColor: '#db4a29',
        completedColor: '#9b2d14',
      },
      position: [props.cc.lat - C.MAP.OFFSET, props.cc.lon - C.MAP.OFFSET],
      showCreate: false,
      zoom: 11,
    }
  }

  handleCreate = showCreate => this.setState({showCreate})

  handleMapClick = ({latlng: {lat, lng}}) => {
    set(C.KEY.CLICK, {lat, lon: lng})
    this.handleCreate(!this.state.showCreate)
  }

  handleMapBTSMove = ({target: {_latlng: {lat, lng}}}, o) => this.handleBTS({...o, lat, lon: lng})
  handleMapHazardMove = ({target: {_latlng: {lat, lng}}}, o) => this.handleHazard({...o, lat, lon: lng})
  handleMapLocationMove = ({target: {_latlng: {lat, lng}}}, o) => this.handleLocation({...o, lat, lon: lng})
  handleMapResponderMove = ({target: {_latlng: {lat, lng}}}, o) => this.handleResponder({...o, lat, lon: lng})
  handleMapUserMove = ({target: {_latlng: {lat, lng}}}, o) => this.handleUser({...o, lat, lon: lng})
  handleMapVehicleMove = ({target: {_latlng: {lat, lng}}}, o) => this.handleVehicle({...o, lat, lon: lng})

  handleModal = (ev, t) => {
    ev.preventDefault()
    this.props.handleModal(true, t)
  }

  handleBTS = v => this.props.handleData(v).then(() => this.props.handleModal(true, C.MODAL.BTS))
  handleCC = v => this.props.handleData(v).then(() => this.props.handleModal(true, C.MODAL.CC))
  handleHazard = v => this.props.handleData(v).then(() => this.props.handleModal(true, C.MODAL.HAZARD))
  handleLocation = v => this.props.handleData(v).then(() => this.props.handleModal(true, C.MODAL.LOCATION))
  handleResponder = v => this.props.handleData(v).then(() => this.props.handleModal(true, C.MODAL.RESPONDER))
  handleUser = v => this.props.handleData(v).then(() => this.props.handleModal(true, C.MODAL.USER))
  handleVehicle = v => this.props.handleData(v).then(() => this.props.handleModal(true, C.MODAL.VEHICLE))

  render() {
    return (
      <div className="map flex-column">
        <Map
          animate={true}
          attributionControl={false}
          center={this.state.position}
          maxZoom={20}
          onClick={this.handleMapClick}
          zoom={this.state.zoom}
          zoomControl={false}>
          <LayersControl position="topright">
            <ZoomControl position="bottomleft" />
            <MeasureControl {...this.state.measureOptions} />
            <Control
              className="leaflet-control-create leaflet-bar leaflet-control"
              position="topleft">
              <div
                className={`dropdown right${this.state.showCreate ? ' open' : ''}`}
                onMouseLeave={() => this.handleCreate(false)}>
                <a className="leaflet-control-create" href="#" onClick={ev => ev.preventDefault()}>
                  <i className="material-icons">add_circle_outline</i>
                </a>
                <div className="content flex flex-column" style={{width: '100px !important'}}>
                  <div className="title">Add Marker</div>
                  <a
                    className="flex-fill"
                    href="#"
                    onClick={ev => this.handleModal(ev, C.MODAL.HAZARD)}>
                    <img src={C.MAP.MARKER.HAZARD.FIRE} /> Hazard
                  </a>
                  <a
                    className="flex-fill"
                    href="#"
                    onClick={ev => this.handleModal(ev, C.MODAL.LOCATION)}>
                    <img src={C.MAP.MARKER.LOCATION.MEDICAL} /> Location
                  </a>
                  <a
                    className="flex-fill"
                    href="#"
                    onClick={ev => this.handleModal(ev, C.MODAL.RESPONDER)}>
                    <img src={C.MAP.MARKER.RESPONDER} /> Responder
                  </a>
                  <a
                    className="flex-fill"
                    href="#"
                    onClick={ev => this.handleModal(ev, C.MODAL.VEHICLE)}>
                    <img src={C.MAP.MARKER.VEHICLE.BUS} /> Vehicle
                  </a>
                </div>
              </div>
            </Control>
            {C.MAP.TILE_SERVERS.map(o => (
              <LayersControl.BaseLayer checked={!!o.checked} key={o.name} name={o.name}>
                <TileLayer url={o.url} />
              </LayersControl.BaseLayer>
            ))}
            <LayersControl.Overlay checked name="Command Center">
              <CC {...this.props.cc} links={this.props.bts.map(o => ({
                attribution: `${o.id}`,
                position: [o.lat, o.lon],
              }))} />
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="BTS">
              <LayerGroup>
                {this.props.bts.map(o => (
                  <BTS
                    {...o}
                    key={o.id}
                    onClick={this.handleBTS}
                    onMoveEnd={ev => this.handleMapBTSMove(ev, o)} />
                ))}
              </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Hazards">
              <LayerGroup>
                {this.props.hazards.map(o => (
                  <Hazard
                    {...o}
                    key={o.id}
                    onClick={this.handleHazard}
                    onMoveEnd={ev => this.handleMapHazardMove(ev, o)} />
                ))}
              </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Locations">
              <LayerGroup>
                {this.props.locations.map(o => (
                  <Location
                    {...o}
                    key={o.id}
                    onClick={this.handleLocation}
                    onMoveEnd={ev => this.handleMapLocationMove(ev, o)} />
                  ))}
              </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Responders">
              <LayerGroup>
                {this.props.responders.map(o => (
                  <Responder
                    {...o}
                    key={o.id}
                    onClick={this.handleResponder}
                    onMoveEnd={ev => this.handleMapResponderMove(ev, o)} />
                ))}
              </LayerGroup>
            </LayersControl.Overlay>
            {[1, 2, 3, 4, 5].map(n => (
              <LayersControl.Overlay checked key={n} name={`Users w/ ESI ${n}`}>
                <LayerGroup>
                  {this.props.users.filter(u => u.esi === n).map(o => (
                    <User
                      {...o}
                      key={o.id}
                      onClick={this.handleUser}
                      onMoveEnd={ev => this.handleMapUserMove(ev, o)} />
                  ))}
                </LayerGroup>
              </LayersControl.Overlay>
            ))}
            <LayersControl.Overlay checked name="Vehicles">
              <LayerGroup>
                {this.props.vehicles.map(o => (
                  <Vehicle
                    {...o}
                    key={o.id}
                    onClick={this.handleVehicle}
                    onMoveEnd={ev => this.handleMapVehicleMove(ev, o)} />
                ))}
              </LayerGroup>
            </LayersControl.Overlay>
          </LayersControl>
        </Map>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  handleData: v => dispatch(setData(v)),
  handleDemo: v => dispatch(setDemo(v)),
  handleModal: (v, t) => dispatch(setModal(v, t)),
})

const mapState = state => ({
  bts: state.bts,
  cc: state.cc,
  demo: state.demo,
  hazards: state.hazards,
  locations: state.locations,
  responders: state.responders,
  users: state.users,
  vehicles: state.vehicles,
})

export default connect(mapState, mapDispatch)(MapC)
