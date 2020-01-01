import React, { Component } from 'react'
import amountAvailable from './amountAvailable'

class Loan extends Component {
    render() {
        let { items, selectItem, collectionDate, returnDate } = this.props
        let itemElements = Object.keys(items).map(key => {
            let item = items[key]
            return (
							<li key={key}>
								<p>{item.name}</p>
								<p>
									{amountAvailable(item, collectionDate, returnDate)} of{' '}
									{item.quantity} available
								</p>
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
