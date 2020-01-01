import React, { Component } from 'react'

class Loan extends Component {
    render() {
        let { items, selectItem } = this.props
        let itemElements = Object.keys(items).map(key => {
            let item = items[key]
            return (
                <li key={key}>
                    {item.name}
                    <button onClick={() => selectItem(key, 0)}>+</button>
                </li>
            )
        })
        return (
            <div>
            <h1>All Items (Select)</h1>
            <ul>{itemElements}</ul>
            </div>
        )
    }
}

export default Loan
