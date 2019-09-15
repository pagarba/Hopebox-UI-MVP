
import React, {useState} from 'react'

const isValidMask = (masks, s) => {
  if (!masks || !s) return false
  if (!Array.isArray(masks)) masks = [masks]
  let valid = false
  masks.forEach(mask => {
    if (s === mask.slice(0, s.length)) valid = true
  })
  return valid
}

const isValidNumber = (masks, s) => {
  if (!masks || !s) return false
  if (!Array.isArray(masks)) masks = [masks]
  let valid = false
  masks.forEach(mask => {
    if (s === mask) valid = true
  })
  return valid
}

const Dial = props => {
  const [number, setNumber] = useState('')

  const onClick = ev => {
    ev.preventDefault()
    const num = `${number}${ev.target.innerText}`
    if (isValidMask(props.masks, num)) setNumber(num)
  }

  return (
    <div className="dial">
      <div className="number">{number}</div>
      <div className="numbers flex flex-column">
        <div className="flex flex-row space-around">
          <a href="#" onClick={ev => onClick(ev, number, setNumber)}>1</a>
          <a href="#" onClick={ev => onClick(ev, number, setNumber)}>2</a>
          <a href="#" onClick={ev => onClick(ev, number, setNumber)}>3</a>
        </div>
        <div className="flex flex-row space-around">
          <a href="#" onClick={ev => onClick(ev, number, setNumber)}>4</a>
          <a href="#" onClick={ev => onClick(ev, number, setNumber)}>5</a>
          <a href="#" onClick={ev => onClick(ev, number, setNumber)}>6</a>
        </div>
        <div className="flex flex-row space-around">
          <a href="#" onClick={ev => onClick(ev, number, setNumber)}>7</a>
          <a href="#" onClick={ev => onClick(ev, number, setNumber)}>8</a>
          <a href="#" onClick={ev => onClick(ev, number, setNumber)}>9</a>
        </div>
        <div className="flex flex-row space-around">
          <a href="#" onClick={ev => onClick(ev, number, setNumber)}>*</a>
          <a href="#" onClick={ev => onClick(ev, number, setNumber)}>0</a>
          <a href="#" onClick={ev => onClick(ev, number, setNumber)}>#</a>
        </div>
        <div className="flex flex-row space-around">
          <a
            className="success"
            href="#"
            onClick={ev => {
              ev.preventDefault()
              if (isValidNumber(props.masks, number)) {
                props.onSend(number)
                setNumber('')
              }
            }}>
            Send
          </a>
          <a
            className="danger"
            href="#"
            onClick={ev => {
              ev.preventDefault()
              setNumber('')
            }}>
              Clear
            </a>
        </div>
      </div>
    </div>
  )
}

export default Dial
