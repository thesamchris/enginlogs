import React from 'react'

const View = ({ items }) => {
    let itemElements = Object.keys(items).map(key => {
      let item = items[key];
      return (
        <li key={key}>
          {item.name}, raw quantity is {item.quantity}
        </li>
      )
    })
    return (
        <div>
            <h1>All Items</h1>
            <ul>
                { itemElements }
            </ul>
        </div>
    )
}

export default View