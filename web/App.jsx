
import {connect} from 'react-redux'
import React from 'react'
import {withRouter} from 'react-router-dom'

import {setCC} from './common/Actions'

import Modal from './container/Modal'
import Navbar from './component/Navbar'
import {Route, Switch} from 'react-router-dom'

import Alerts from './container/Alerts'
import Manage from './container/Manage'
import MapC from './container/Map'
import Settings from './container/Settings'
import Setup from './container/Setup'
import Splash from './container/Splash'

import '../sass/main.scss'

class App extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (!props.cc.config && props.location.pathname !== '/') {
      props.history.push('/')
    }
    return null
  }

  constructor(props) {
    super(props)
    this.state = {
      drawer: false,
    }
  }

  handleDrawer = () => this.setState({drawer: !this.state.drawer})

  render() {
    return (
      <div className="container">
        <Splash />
        <Navbar onDrawer={this.handleDrawer} path={this.props.location.pathname} />
        <Alerts />
        <Modal />
        <div className="content">
          <Switch>
            <Route component={Manage} path="/manage" />
            <Route component={MapC} path="/map" />
            <Route component={Settings} path="/settings" />
            <Route component={Setup} exact path="/" />
          </Switch>
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  handleCC: v => dispatch(setCC(v)),
})

const mapState = state => ({
  cc: state.cc,
})

export default withRouter(connect(mapState, mapDispatch)(App))
