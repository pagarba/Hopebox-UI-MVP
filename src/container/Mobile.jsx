
import C from '../common/Constants'
import {connect} from 'react-redux'
import React from 'react'

import {createUser} from '../common/Actions'
import {user} from '../common/Data'

import Dial from '../component/Dial'
import Phone from '../component/Phone'
import SMS from '../component/SMS'
import USSD from '../component/USSD'

const questions = {
  0: [7, 1, 'Is their an immediate threat to your life, medical or otherwise? Call: *1# for yes *2# for no', 1],
  1: [2, 8, 'Are you experiencing any medical complications at this time? Call: *1# for yes *2# for no', 5],
  2: [7, 3, 'Do you have trouble breathing or major blood loss? Call: *1# for yes *2# for no', 1],
  3: [7, 4, 'Do you have chest pains or major lacerations? Call: *1# for yes *2# for no', 2],
  4: [8, 5, 'Do you have abdominal pain or a fractured bone? Call: *1# for yes *2# for no', 3],
  5: [8, 6, 'Do you have minor pain or lacerations? Call: *1# for yes *2# for no', 4],
  6: [8, 8, 'Do you have any other minor health related issues? Call: *1# for yes *2# for no', 5],
  7: [99, 99, 'Thank you, emergency responders have been notified of your general location and will be with you ASAP.', 0],
  8: [99, 99, 'Thank you, we have provided your information to emergency responders. Please wait for further instruction.', 0],
  99: [0, 0, 'You are connected to an emergency response system, please call *911# or text 911 for further assistance.', 0],
}

class Mobile extends React.Component {
  static getDerivedStateFromProps(props, state) {
    state.masks = state.question === 99 ? ['*911#'] : ['*1#', '*2#']
    return state
  }

  constructor(props) {
    super(props)
    this.state = {
      esi: 0,
      dial: false,
      masks: ['*911#', '*1#', '*2#'],
      question: 99,
      sms: false,
      ussd: true,
    }
  }

  handleCall = ev => {
    ev.preventDefault()
    this.setState({dial: !this.state.dial})
  }

  handleSend = num => {
    let {esi, question, ussd} = this.state
    const q = questions[question]
    const yes = num === '*911#' || num === '*1#'

    if (yes) esi = q[3]
    question = yes ? q[0] : q[1]
    ussd = true

    if (question === 7 || question === 8) {
      this.props.handleUser({id: 1, bts: 1, esi, name: 'YOU'})
    }

    this.setState({esi, question, ussd})
  }

  handleSMS = ev => {
    ev.preventDefault()
    this.setState({sms: !this.state.sms})
  }

  handleText = msg => {
    console.log('text:', msg)
  }

  handleUSSD = ev => {
    ev.preventDefault()
    this.setState({ussd: !this.state.ussd})
  }

  render() {
    if (!this.props.open) return null

    return (
      <div className="mobile">
        <Phone
          onCall={this.handleCall}
          onSMS={this.handleSMS}>
          {this.state.dial &&
            <Dial masks={this.state.masks} onSend={this.handleSend} />
          }
          {this.state.sms &&
            <SMS onSend={this.handleText} />
          }
          {!!this.state.ussd &&
            <USSD onDismiss={this.handleUSSD}>
              {questions[this.state.question][2]}
            </USSD>
          }
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

export default connect(mapState, mapDispatch)(Mobile)
