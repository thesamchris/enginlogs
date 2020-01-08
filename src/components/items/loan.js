import React, { Component } from 'react'
import amountAvailable from './amountAvailable'
import { Link } from 'react-router-dom'

class Loan extends Component {
	render() {
		let { items, selectItem, collectionDate, returnDate } = this.props
		let isAllowedToSelectItems = collectionDate && returnDate
		let elements

		let itemElements = items.map(key => {
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

		if (isAllowedToSelectItems) {
			elements = (
				<div>
                    <p>loaning items from: {collectionDate} to {returnDate}</p>
					<Link className="link__space" to="/cart">go to cart</Link>
                    <Link className="link__space" to="/details">update loaning period</Link>
					<ul>{itemElements}</ul>
				</div>
			)
		} else {
			elements = (
				<p>
					Please key in loaning period <Link to="/details">here</Link>
				</p>
			)
		}
		return (
			<div>
				<h1>Select Items To Loan</h1>
				{elements}
			</div>
		)
	}
}

export default Loan
