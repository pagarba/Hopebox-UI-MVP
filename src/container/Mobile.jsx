
import C from '../common/Constants'
import {connect} from 'react-redux'
import React from 'react'

import {createUser} from '../common/Actions'

import Phone from '../component/Phone'

const states = {
  0: {
    next: 1,
    text: 'Some text here 0',
  },
  1: {
    next: 2,
    text: 'Some text here 1',
  },
  2: {
    next: 3,
    text: 'Some text here 2',
  },
  3: {
    next: 4,
    text: 'Some text here 3',
  },
  4: {
    next: 0,
    text: 'Some text here 4',
  },
}

class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      carrier: 'ACME Wireless',
      network: '4G',
      position: 0,
      signal: C.MOBILE.ICON.CELL.ON,
      wifi: C.MOBILE.ICON.WIFI.ON,
    }
  }

  handleNext = () => this.setState({position: states[this.state.position].next})

  render() {
    if (!this.props.open) return null

    return (
      <div className="mobile">
        <Phone
          carrier={this.state.carrier}
          network={this.state.network}
          signal={this.state.signal}
          wifi={this.state.wifi}>
          <div className="text-center">
            <p>{states[this.state.position].text}</p>
            <button className="full" onClick={this.handleNext}>Next</button>
          </div>
        </Phone>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  handleUser: v => dispatch(createUser(v)),
})

const mapState = state => ({

})

export default connect(mapState, mapDispatch)(Settings)
