
import React from 'react'

export const Pagination = ({onPage, onSize, page, size, total, ...props}) => {
  const count = Math.ceil(total / size)
  const pages = []
  const sizes = []
  for (let i = 0; i < count; i++) {
    pages.push(
      <a
        className={page === i ? 'active' : ''}
        href="#"
        key={i}
        onClick={ev => {
          ev.preventDefault()
          onPage(i)
        }}>
        {i + 1}
      </a>
    )
  }
  [10, 25, 50].forEach(i => {
    sizes.push(
      <a
        className={size === i ? 'active' : ''}
        href="#"
        key={i}
        onClick={ev => {
          ev.preventDefault()
          onSize(i)
        }}>
        {i}
      </a>
    )
  })

  return (
    <div className="pagination flex flex-row" {...props}>
      <div className="size">
        Size: {sizes}
      </div>
      <div className="page">
        Page: {pages}
      </div>
    </div>
  )
}

export default Pagination
