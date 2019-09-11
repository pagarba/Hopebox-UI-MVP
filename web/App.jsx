
import {connect} from 'react-redux'
import React from 'react'

import {setModal} from './common/Actions'

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
        <Navbar onDrawer={this.handleDrawer} />
        <Alerts />
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
  handleModal: (v, t) => dispatch(setModal(v, t)),
})

const mapState = state => ({
  modal: state.modal,
})

export default connect(mapState, mapDispatch)(App)
