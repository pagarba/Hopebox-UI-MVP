
import React from 'react'

const USSD = props => (
  <div className="middle ussd">
    <div className="title">Phone</div>
    <div className="message">
      {props.children}
    </div>
    <button className="full" onClick={props.onDismiss}>
      DISMISS
    </button>
  </div>
)

export default USSD
