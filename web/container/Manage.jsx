
import {connect} from 'react-redux'
import React from 'react'

class Manage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="manage">
        Manage
      </div>
    )
  }
}

const mapDispatch = dispatch => ({

})

const mapState = state => ({

})

export default connect(mapState, mapDispatch)(Manage)
