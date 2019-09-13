
import {connect} from 'react-redux'
import React from 'react'

import {setStartup} from '../common/Actions'

class Manage extends React.Component {
  componentDidMount() {
    this.props.handleStartup(false)
  }

  render() {
    if (!this.props.startup) return null

    return (
      <div className="splash cover" style={{zIndex: 9999}}>
        <div className="middle">
          <img alt="HopeBox is loading!" src="img/logo-full.jpg" />
          <div className="loading">Loading...</div>
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  handleStartup: v => dispatch(setStartup(v)),
})

const mapState = state => ({
  startup: state.startup,
})

export default connect(mapState, mapDispatch)(Manage)
