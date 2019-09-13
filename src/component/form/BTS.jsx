
import C from '../../common/Constants'
import React from 'react'

import {keys} from '../../common/Utils'

import Component from './Component'
import {Form, Reset, Submit} from '../Form'

export default class BTSForm extends Component {
  static defaultProps = {
    fields: [
      {
        props: {
          id: 'start',
          name: 'start',
          text: 'Angle Start',
          value: 90,
        },
        input: 'input',
        validate: {max: 360, min: 0, required: true},
      },
      {
        props: {
          id: 'stop',
          name: 'stop',
          text: 'Angle Stop',
          value: 180,
        },
        input: 'input',
        validate: {max: 360, min: 0, required: true},
      },
      {
        props: {
          id: 'freq',
          name: 'freq',
          options: C.BTS.FREQUENCIES.map(range => ({text: range, value: range})),
          text: 'Frequency',
          value: C.BTS.FREQUENCIES[0],
        },
        input: 'select',
        validate: {required: true},
      },
      {
        props: {
          id: 'range',
          name: 'range',
          text: 'Range (m or km)',
        },
        input: 'input',
        validate: {max: 22, min: 0.01, required: true},
      },
      {
        props: {
          id: 'lat',
          name: 'lat',
          text: 'Latitude',
          value: C.MAP.POSITION[0],
        },
        input: 'input',
        validate: {required: true},
      },
      {
        props: {
          id: 'lon',
          name: 'lon',
          text: 'Longitude',
          value: C.MAP.POSITION[1],
        },
        input: 'input',
        validate: {required: true},
      },
      {
        props: {
          id: 'notes',
          name: 'notes',
          text: 'Notes',
        },
        input: 'textarea',
      },
    ],
    deleteText: 'Delete',
    resetText: 'Reset',
    submitText: 'Submit',
  }

  handleSubmit = ev => {
    ev.preventDefault()
    const data = {angle: {}}
    keys(this.state.data).forEach(k => {
      if (k === 'start' || k === 'stop') {
        data.angle[k] = this.state.data[k]
      } else {
        data[k] = this.state.data[k]
      }
    })

    this.validateData()
      .then(() => this.props.onSubmit(data))
      .catch(err => {})
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <h3>BTS Form</h3>
        <div className="flex flex-column">
          <div className="flex flex-row">
            {this.renderField(this.props.fields[0])}
            {this.renderField(this.props.fields[1])}
            {this.renderField(this.props.fields[2])}
            {this.renderField(this.props.fields[3])}
          </div>
          <div className="flex flex-row">
            {this.renderField(this.props.fields[4])}
            {this.renderField(this.props.fields[5])}
          </div>
          {this.renderField(this.props.fields[6])}
        </div>
        <div className="flex flex-row flex-around">
          <Submit onClick={this.handleSubmit} text={this.props.submitText} />
          {!!this.state.data.id && !!this.props.onDelete &&
            <button
              className="danger"
              onClick={this.handleDelete}>
              {this.props.deleteText}
            </button>
          }
        </div>
      </Form>
    )
  }
}
