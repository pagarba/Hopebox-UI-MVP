
import C from '../../common/Constants'
import React from 'react'

import Component from './Component'
import {Form, Reset, Submit} from '../Form'

export default class SettingsForm extends Component {
  static defaultProps = {
    fields: [
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
          id: 'lang',
          name: 'lang',
          options: C.CC.LANGUAGES.map(v => ({text: v, value: v})),
          text: 'Language',
          value: C.CC.LANGUAGES[0],
        },
        input: 'select',
        validate: {required: true},
      },
      {
        props: {
          id: 'measure',
          name: 'measure',
          options: [
            {text: 'Kilometer', value: 'km'},
            {text: 'Mile', value: 'm'},
          ],
          text: 'Measure',
          value: 'm',
        },
        input: 'select',
        validate: {max: 22, min: 0.01, required: true},
      },
      {
        props: {
          id: 'ssid',
          name: 'ssid',
          text: 'Wireless SSID',
        },
        input: 'input',
      },
      {
        props: {
          id: 'psk',
          name: 'psk',
          text: 'WiFi Password',
        },
        input: 'input',
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
          <Submit onClick={this.handleSubmit} text={this.props.submitText} />
        </div>
      </Form>
    )
  }
}
