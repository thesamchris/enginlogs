import React, { Component } from 'react'
import { withFirebase } from '../Firebase/context'
import CartItem from './cartItem'
import { withRouter } from 'react-router-dom'

class Cart extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			items: {}
		}

		this.handleChange = this.handleChange.bind(this)
		this.newBooking = this.newBooking.bind(this)
	}

	handleChange(e) {
		e.preventDefault()
		let { id, value } = e.target
		this.props.selectItem(id, value)
	}

	newBooking(collectionDate, returnDate, newBooking) {
		// days <= 7
		let newBookingRef = this.props.firebase.bookings().push()
		let { key: bookingId } = newBookingRef
		newBookingRef.set(newBooking)
		let j
		Object.keys(newBooking.selectedItems).map(itemId => {
			for (j = collectionDate; j <= returnDate; j.setDate(j.getDate() + 1)) {
				let day = j.toISOString().substring(0, 10)
				this.props.firebase.bookItem(itemId, day).update({
					[bookingId]: newBooking.selectedItems[itemId]
				})
			}
			collectionDate = new Date(newBooking.collectionDate)
		})
		this.props.history.push('/success')
	}

	render() {
		let {
			collectionDate,
			returnDate,
			selectedItems,
			loading,
			items
		} = this.props
		let newBooking = {
			collectionDate: this.props.collectionDate,
			returnDate: this.props.returnDate,
			selectedItems: this.props.selectedItems,
			email: this.props.email
		}
		let itemElements
		let haveItemsInCart = !(Object.entries(selectedItems).length === 0)
		if (selectedItems) {
			itemElements = Object.keys(selectedItems).map(key => (
				<CartItem
					key={key}
					id={key}
					collectionDate={collectionDate}
					returnDate={returnDate}
					onChange={this.handleChange}
					itemData={items[key]}
					selectItem={this.props.selectItem}
					selectedItems={this.props.selectedItems}
					haveDateRange={this.props.haveDateRange}
				/>
			))
		}
		return (
			<div>
				<h1>Cart</h1>
				{loading ? 'loading' : ''}
				{haveItemsInCart ? itemElements : 'please select some items'}
				{haveItemsInCart ? (
					<button
						onClick={() => this.newBooking(
							new Date(collectionDate),
							new Date(returnDate),
							newBooking
						)}
					>
						Confirm Booking
					</button>
				) : (
					''
				)}
			</div>
		)
	}
}

export default withRouter(withFirebase(Cart))
