
import C from '../../common/Constants'
import React from 'react'

import {keys, ucFirst} from '../../common/Utils'

import Component from './Component'
import {Form, Reset, Submit} from '../Form'

export default class LocationForm extends Component {
  static defaultProps = {
    fields: [
      {
        props: {
          id: 'type',
          name: 'type',
          options: keys(C.MAP.MARKER.LOCATION).map((k, i) => ({text: ucFirst(k), value: i + 1})),
          text: 'Type',
          value: 1,
        },
        input: 'select',
        validate: {max: keys(C.MAP.MARKER.LOCATION).length, min: 1, required: true},
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
        <h3>Location Form</h3>
        <div className="flex flex-column">
          {this.renderField(this.props.fields[0])}
          <div className="flex flex-row">
            {this.renderField(this.props.fields[1])}
            {this.renderField(this.props.fields[2])}
          </div>
          {this.renderField(this.props.fields[3])}
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
