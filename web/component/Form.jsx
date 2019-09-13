
import React, {useState} from 'react'

export const Input = props => {
  const [value, setValue] = useState(props.value || '')

  return (
    <input
      id={props.id || props.name}
      name={props.name}
      onChange={ev => {
        setValue(ev.target.value)
        props.onChange(ev.target.name, ev.target.value)
      }}
      type={props.type ? props.type : 'text'}
      value={value} />
  )
}

export const InputGroup = props => {
  return (
    <div className={`input-group${props.className ? ` ${props.className}` : ''}`}>
      <label htmlFor={props.id || props.name}>{props.text}</label>
      {props.children}
    </div>
  )
}

export const Reset = props => (
  <button
    className=""
    onClick={props.onClick}
    type="reset">
    {props.text}
  </button>
)

export const Select = props => {
  const [value, setValue] = useState(props.value || '')

  return (
    <select
      id={props.id || props.name}
      name={props.name}
      onChange={ev => {
        setValue(ev.target.value)
        props.onChange(ev.target.name, ev.target.value)
      }}
      value={value}>
      {props.options.map((o, i) => (
        <option key={i} value={o.value}>{o.text}</option>
      ))}
    </select>
  )
}

export const Submit = props => (
  <button
    className="primary"
    onClick={props.onClick}
    type="submit">
    {props.text}
  </button>
)

export const TextArea = props => {
  const [value, setValue] = useState(props.value || '')

  return (
    <textarea
      id={props.id || props.name}
      name={props.name}
      onChange={ev => {
        setValue(ev.target.value)
        props.onChange(ev.target.name, ev.target.value)
      }}
      value={value} />
  )
}

export const Form = props => (
  <form onSubmit={props.onSubmit}>
    {props.children}
  </form>
)

export default Form
