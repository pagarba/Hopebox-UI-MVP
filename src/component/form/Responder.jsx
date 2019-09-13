
import C from '../../common/Constants'
import React from 'react'

import Component from './Component'
import {Delete, Form, Submit} from '../Form'

export default class ResponderForm extends Component {
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
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <h3>Responder Form</h3>
        <div className="flex flex-column">
          <div className="flex flex-row">
            {this.renderField(this.props.fields[0])}
            {this.renderField(this.props.fields[1])}
          </div>
          <div className="flex flex-row">
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
          <Submit onClick={this.handleSubmit} />
          {!!this.state.data.id && !!this.props.onDelete &&
            <Delete onClick={this.handleDelete} />
          }
        </div>
      </Form>
    )
  }
}
