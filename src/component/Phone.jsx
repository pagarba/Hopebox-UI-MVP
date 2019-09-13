
import C from '../common/Constants'
import React from 'react'

const Phone = ({children, ...props}) => (
  <div className="phone">
    <div className="head flex flex-row">
      <div className="carrier">{props.carrier}</div>
      <div className="flex-fill" />
      <div className="wifi">
        <i className="material-icons">{props.wifi}</i>
      </div>
      <div className="network">{props.network}</div>
      <div className="signal">
        <i className="material-icons">{props.signal}</i>
      </div>
      <div className="battery">
        <i className="material-icons">{C.MOBILE.ICON.BATTERY}</i>
      </div>
    </div>
    <div className="body">
      <div className="middle">{children}</div>
    </div>
    <div className="foot flex flex-row space-around">
      <div className="call flex-fill">
        <i className="material-icons">{C.MOBILE.ICON.PHONE}</i>
      </div>
      <div className="sms flex-fill">
        <i className="material-icons">{C.MOBILE.ICON.SMS}</i>
      </div>
      <div className="apps flex-fill">
        <i className="material-icons">{C.MOBILE.ICON.APPS}</i>
      </div>
      <div className="browser flex-fill">
        <i className="material-icons">{C.MOBILE.ICON.BROWSER}</i>
      </div>
      <div className="camera flex-fill">
        <i className="material-icons">{C.MOBILE.ICON.CAMERA}</i>
      </div>
    </div>
  </div>
)

export default Phone
