
import React from 'react'

const Alert = props => (
  <div className={`alert ${props.type}`}>
    {props.message}
    {props.onClick &&
      <a
        className="close"
        href="#"
        onClick={() => props.onClick(props.id)}>&close;</a>
    }
  </div>
)

export default Alert
