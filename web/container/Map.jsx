
import C from '../common/Constants'
import {connect} from 'react-redux'
import React from 'react'

import {
  BTS,
  CC,
  Hazard,
  Location,
  Responder,
  User,
  Vehicle,
} from '../component/Map'
import {
  LayerGroup,
  LayersControl,
  Map,
  TileLayer,
  ZoomControl,
} from 'react-leaflet'
import EntityToolbar from './EntityToolbar'
import MeasureControl from 'react-leaflet-measure'

class ClusterComponent extends React.Component {
  render() {
    const {cluster} = this.props

    if (cluster.markers.length === 1) {
      return (
        <div>{cluster.markers[0]}</div>
      )
    }

    return (
      <div>{cluster.markers.length} items</div>
    )
  }
}

class MapC extends React.Component {
  static defaultProps = {
    users: [],
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
      zoom: 11,
    }
  }

  handleResponder = console.log

  render() {
    return (
      <div className="map flex-column">
        <div className="toolbar">
          <EntityToolbar />
        </div>
        <Map
          animate={true}
          center={this.state.position}
          zoom={this.state.zoom}
          zoomControl={false}>
          <LayersControl position="topright">
            <ZoomControl position="bottomleft" />
            <MeasureControl {...this.state.measureOptions} />
            {C.MAP.TILE_SERVERS.map(o => (
              <LayersControl.BaseLayer checked={!!o.checked} key={o.name} name={o.name}>
                <TileLayer url={o.url} />
              </LayersControl.BaseLayer>
            ))}
            <LayersControl.Overlay checked name="Command Center">
              <CC {...this.props.cc} />
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="BTS">
              <LayerGroup>
                {this.props.bts.map(o => (<BTS {...o} key={o.id} />))}
              </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Hazards">
              <LayerGroup>
                {this.props.hazards.map(o => (<Hazard {...o} key={o.id} />))}
              </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Locations">
              <LayerGroup>
                {this.props.locations.map(o => (<Location {...o} key={o.id} />))}
              </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Responders">
              <LayerGroup>
                {this.props.responders.map(o => (<Responder {...o} key={o.id} onClick={this.handleResponder} />))}
              </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Users">
              <LayerGroup>
                {this.props.users.map(o => (<User {...o} key={o.id} />))}
              </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Vehicles">
              <LayerGroup>
                {this.props.vehicles.map(o => (<Vehicle {...o} key={o.id} />))}
              </LayerGroup>
            </LayersControl.Overlay>
          </LayersControl>
        </Map>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({

})

const mapState = state => ({
  bts: state.bts,
  cc: state.cc,
  hazards: state.hazards,
  locations: state.locations,
  responders: state.responders,
  users: state.users,
  vehicles: state.vehicles,
})

export default connect(mapState, mapDispatch)(MapC)
