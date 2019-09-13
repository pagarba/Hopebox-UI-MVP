
import C from '../../common/Constants'
import React from 'react'

import Component from './Component'
import {Form, Reset, Submit} from '../Form'

export default class UserForm extends Component {
  static defaultProps = {
    fields: [
      {
        props: {
          id: 'name',
          name: 'name',
          text: 'Full Name (Last, First)',
          value: '',
        },
        input: 'input',
        validate: {required: true},
      },
      {
        props: {
          id: 'bts',
          name: 'bts',
          options: [1, 2, 3, 4].map(o => ({text: o, value: o})),
          text: 'BTS',
          value: 1,
        },
        input: 'select',
        validate: {max: 4, min: 1, required: true},
      },
      {
        props: {
          id: 'esi',
          name: 'esi',
          options: [1, 2, 3, 4, 5].map(o => ({text: o, value: o})),
          text: 'ESI',
          value: 5,
        },
        input: 'select',
        validate: {max: 4, min: 1, required: true},
      },
      {
        props: {
          id: 'imsi',
          name: 'imsi',
          text: 'IMSI',
          value: '',
        },
        input: 'input',
        validate: {max: 15, min: 15, required: true},
      },
      {
        props: {
          id: 'msisdn',
          name: 'msisdn',
          text: 'MSISDN (Phone #)',
          value: '',
        },
        input: 'input',
        validate: {required: true},
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

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <h3>Responder Form</h3>
        <div className="flex flex-column">
          <div className="flex flex-row">
            {this.renderField(this.props.fields[0])}
            {this.renderField(this.props.fields[1])}
            {this.renderField(this.props.fields[2])}
          </div>
          <div className="flex flex-row">
            {this.renderField(this.props.fields[3])}
            {this.renderField(this.props.fields[4])}
          </div>
          <div className="flex flex-row">
            {this.renderField(this.props.fields[5])}
            {this.renderField(this.props.fields[6])}
          </div>
          {this.renderField(this.props.fields[7])}
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
