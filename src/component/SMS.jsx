
import React from 'react'

const SMS = props => (
  <div className="middle sms">
    <div className="title">Text Message</div>
    <div className="messages">
      {props.children}
    </div>
    <button className="primary full" onClick={props.onClick}>
      REPLY
    </button>
    <button className="full" onClick={props.onClick}>
      DISMISS
    </button>
  </div>
)

export default SMS
