
import C from '../../common/Constants'
import React from 'react'

import {keys, get} from '../../common/Utils'

import {
  Delete,
  Form,
  Input,
  InputGroup,
  Reset,
  Select,
  Submit,
  TextArea,
} from '../Form'

export default class Component extends React.Component {
  static defaultProps = {
    fields: [],
  }

  constructor(props) {
    super(props)
    this.state = {
      data: {},
      error: {},
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (!keys(state.data).length) {
      if (props.data && keys(props.data).length) {
        keys(props.data).forEach(key => {
          if (key === 'angle' && props.data.angle) {
            state.data.start = props.data.angle.start
            state.data.stop = props.data.angle.stop
          } else {
            state.data[key] = props.data[key]
          }
        })
      } else {
        props.fields.forEach(field => {
          state.data[field.props.name] = field.props.value || ''
        })
      }

      // Load the geolocation from the last clicked location
      // on the map stored in local storage.
      let geo = get(C.KEY.CLICK)
      if (!!geo) {
        if (!!geo.lat) state.data.lat = geo.lat
        if (!!geo.lon) state.data.lon = geo.lon
      }

      return state
    }
    return null
  }

  handleChange = (name, value = '') => this.setState({
    ...this.state,
    data: {
      ...this.state.data,
      [name]: value,
    },
  })

  handleDelete = ev => {
    ev.preventDefault()
    this.props.onDelete(this.state.data.id)
  }

  handleSubmit = ev => {
    ev.preventDefault()
    console.log('handleSubmit:', this.state.data)
    this.validateData()
      .then(() => this.props.onSubmit(this.state.data))
      .catch(err => {})
  }

  validateData = () => {
    return new Promise((resolve, reject) => {
      const {data} = this.state
      const error = {}

      this.props.fields.forEach(field => {
        if (field.hasOwnProperty('validate')) {
          const name = field.props.name
          const value = data[name]

          for (let [k, v] of Object.entries(field.validate)) {
            if (k === 'required' && !value) {
              error[name] = `Value is required`
            } else if (k === 'max' && !!value) {
              if (isNaN(value) && value.length > v) {
                error[name] = `Maximum length of ${v} allowed`
              } else if (value > v) {
                error[name] = `Maximum value of ${v} allowed`
              }
            } else if (k === 'min' && !!value) {
              if (isNaN(value) && value.length < v) {
                error[name] = `Minimum length of ${v} allowed`
              } else if (value < v) {
                error[name] = `Minimum value of ${v} allowed`
              }
            } else if (k === 'compare' && !!value && value !== data[v]) {
              error[name] = `Does not match "${v}"`
            }
          }
        }
      })

      const valid = !Object.keys(error).length
      this.setState({error}, valid ? resolve : reject)
    })
  }

  // Render

  renderField = field => {
    let comp = null
    switch (field.input) {
      case 'input':
        comp = (<Input {...{...field.props, value: this.state.data[field.props.name]}} onChange={this.handleChange} />)
        break
      case 'select':
        comp = (<Select {...{...field.props, value: this.state.data[field.props.name]}} onChange={this.handleChange} />)
        break
      case 'textarea':
        comp = (<TextArea {...{...field.props, value: this.state.data[field.props.name]}} onChange={this.handleChange} />)
        break
      default:
        break
    }

    return (
      <InputGroup
        {...field.props}
        key={field.props.name}
        value={this.state.data[field.props.name]}>
        {comp}
        {this.state.error.hasOwnProperty(field.props.name) &&
          <div className="error">{this.state.error[field.props.name]}</div>
        }
      </InputGroup>
    )
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        {this.props.fields.map(this.renderField)}
        <div className="flex flex-row flex-around">
          <Submit onClick={this.handleSubmit} />
          {!!this.state.data.id &&
            <Delete onClick={this.handleDelete} />
          }
        </div>
      </Form>
    )
  }
}
