
import C from '../common/Constants'
import {connect} from 'react-redux'
import React from 'react'
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'

import {setData, setDemo, setModal} from '../common/Actions'
import {ucFirst} from '../common/Utils'

import BTS from '../component/table/BTS'
import Hazard from '../component/table/Hazard'
import Location from '../component/table/Location'
import Pagination from '../component/Pagination'
import Responder from '../component/table/Responder'
import User from '../component/table/User'
import Vehicle from '../component/table/Vehicle'

class Manage extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (!props.demo) {
      props.handleDemo(true)
    }

    let modified = false
    const section = props.location.pathname.replace('/manage/', '')
    if (section !== state.section) {
      state.page = 0
      state.section = section
      modified = true
    }

    if (props[state.section] && props[state.section].length !== state.total) {
      state.total = props[state.section].length
      modified = true
    }

    if (modified) return state
    return null
  }

  constructor(props) {
    super(props)
    this.links = [
      'bts',
      'hazards',
      'locations',
      'responders',
      'users',
      'vehicles',
    ]
    this.state = {
      page: 0,
      section: '',
      size: 25,
      total: 0,
    }
  }

  handleData = (ev, row) => {
    if (ev.preventDefault) ev.preventDefault()

    return this.props.handleData(row)
      .then(() => this.handleModal(true))
  }

  handleModal = v => {
    if (this.state.section === 'bts') {
      return this.props.handleModal(v, C.MODAL.BTS)
    } else if (this.state.section === 'hazards') {
      return this.props.handleModal(v, C.MODAL.HAZARD)
    } else if (this.state.section === 'locations') {
      return this.props.handleModal(v, C.MODAL.LOCATION)
    } else if (this.state.section === 'responders') {
      return this.props.handleModal(v, C.MODAL.RESPONDER)
    } else if (this.state.section === 'users') {
      return this.props.handleModal(v, C.MODAL.USER)
    } else if (this.state.section === 'vehicles') {
      return this.props.handleModal(v, C.MODAL.VEHICLE)
    }
  }

  handlePage = page => this.setState({page})

  handleRoute = (ev, path) => {
    ev.preventDefault()
    this.props.history.push(path)
  }

  handleSize = size => this.setState({size})

  isActive = path => this.props.location.pathname === path ? 'active' : ''

  renderTable = Comp => {
    let rows = []
    if (this.props[this.state.section]) {
      rows = this.props[this.state.section].map(row => {
        row.idLink = (<a href="#" onClick={ev => this.handleData(ev, row)}>{row.id}</a>)
        if (row.angle) row.angleRange = `${row.angle.start}-${row.angle.stop}`
        return row
      })
    }

    const start = this.state.page * this.state.size
    let stop = start + this.state.size
    if (stop > this.state.total) stop = this.state.total
    return (
      <Comp key="table" onClick={console.log} rows={rows.slice(start, stop)} />
    )
  }

  render() {
    return (
      <div className="manage flex flex-row">
        <div className="menu flex flex-column">
          {this.links.map(link => (
            <a
              className={this.isActive(`/manage/${link}`)}
              href="#"
              key={link}
              onClick={ev => this.handleRoute(ev, `/manage/${link}`)}>
              {link === 'bts' ? 'BTS' : ucFirst(link)}
            </a>
          ))}
        </div>
        <div className="table flex-fill scroll">
          {this.state.section !== 'bts' && this.state.section !== 'users' &&
            <div className="flex flex-row">
              <div className="flex-fill" />
              <button className="" onClick={ev => this.handleData(ev, {})}>
                <i className="material-icons">add_circle_outline</i> CREATE
              </button>
            </div>
          }
          <Pagination
            onPage={this.handlePage}
            onSize={this.handleSize}
            page={this.state.page}
            size={this.state.size}
            total={this.state.total} />
          <Switch>
            <Route component={() => this.renderTable(BTS)} path="/manage/bts" />
            <Route component={() => this.renderTable(Hazard)} path="/manage/hazards" />
            <Route component={() => this.renderTable(Location)} path="/manage/locations" />
            <Route component={() => this.renderTable(Responder)} path="/manage/responders" />
            <Route component={() => this.renderTable(User)} path="/manage/users" />
            <Route component={() => this.renderTable(Vehicle)} path="/manage/vehicles" />
            <Route component={() => (<Redirect to="/manage/bts" />)} exact path="/manage" />
          </Switch>
        </div>
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
  demo: state.demo,
  hazards: state.hazards,
  locations: state.locations,
  responders: state.responders,
  users: state.users,
  vehicles: state.vehicles,
})

export default withRouter(connect(mapState, mapDispatch)(Manage))
