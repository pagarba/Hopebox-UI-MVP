
import C from '../common/Constants'
import React from 'react'

const Phone = ({children, ...props}) => (
  <div className="phone">
    <div className="head flex flex-row">
      <div className="carrier">HopeBox Emergency Network</div>
      <div className="flex-fill" />
      <div className="wifi">
        <i className="material-icons">{C.MOBILE.ICON.WIFI.OFF}</i>
      </div>
      <div className="network">R</div>
      <div className="signal">
        <i className="material-icons">{C.MOBILE.ICON.CELL.ON}</i>
      </div>
      <div className="battery">
        <i className="material-icons">{C.MOBILE.ICON.BATTERY}</i>
      </div>
    </div>
    <div className="body">{children}</div>
    <div className="foot flex flex-row space-around">
      <div className="call flex-fill">
        <a href="#" onClick={props.onCall}>
          <i className="material-icons">{C.MOBILE.ICON.PHONE}</i>
        </a>
      </div>
      <div className="sms flex-fill">
        <a href="#" onClick={props.onSMS}>
          <i className="material-icons">{C.MOBILE.ICON.SMS}</i>
        </a>
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
