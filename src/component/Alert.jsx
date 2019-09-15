
import React from 'react'

const Alert = props => (
  <div className={`alert ${props.type}`}>
    {props.message}
    {props.onClick &&
      <a
        className="close"
        href="#"
        onClick={ev => {
          ev.preventDefault()
          props.onClick(props.id)
        }}>X</a>
    }
  </div>
)

export default Alert
