import React from 'react'

const View = ({ items, category }) => {
    if (!items) {
      return null
    }
    let itemElements = items.map((item, key) => {
      return (
        <li key={key}>
          {item.name}, raw quantity is {item.quantity}
        </li>
      )
    })
    return (
        <div>
            <h1>{ category }</h1>
            <ul>
                { itemElements }
            </ul>
        </div>
    )
}

export default View