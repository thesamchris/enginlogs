import React, { Component } from 'react'
import { withFirebase } from '../Firebase/context'
import CartItem from './cartItem'
import { withRouter, Link } from 'react-router-dom'
import axios from 'axios'

axios.create({
	baseURL: '/'
})

class Cart extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			items: {},
			buttonDisabled: false
		}

		this.handleChange = this.handleChange.bind(this)
		this.newBooking = this.newBooking.bind(this)
		this.sendConfirmationEmail = this.sendConfirmationEmail.bind(this)
	}

	handleChange(id, value) {
		return this.props.selectItem(id, value)
	}

	newBooking(collectionDate, returnDate, newBooking) {
		// days <= 7
		let newBookingRef = this.props.firebase.bookings().push()
		let { key: bookingId } = newBookingRef
		newBookingRef.set(newBooking)
		let j
		// eslint-disable-next-line
		Object.keys(newBooking.selectedItems).map(itemId => {
			for (j = collectionDate; j <= returnDate; j.setDate(j.getDate() + 1)) {
				let day = j.toISOString().substring(0, 10)
				this.props.firebase.bookItem(itemId, day).update({
					[bookingId]: newBooking.selectedItems[itemId]
				})
			}
			collectionDate = new Date(newBooking.collectionDate)
		})
		this.sendConfirmationEmail(bookingId, collectionDate, returnDate, newBooking)
		this.props.history.push('/success')
	}

	async sendConfirmationEmail(bookingId, collectionDate, returnDate, newBooking) {
		// send email here
		let { email, selectedItems:items, collectionTime, returnTime } = newBooking
		try {
			let itemsForEmail = Object.keys(items).map(key => { 
				let itemName = this.props.items[key].name
				return {
					id: key,
					quantity: items[key],
					name: itemName
				}
			})
			const response = await axios.post('/.netlify/functions/send-confirmation-email', {
				collectionDate: collectionDate.toDateString(),
				returnDate: returnDate.toDateString(),
				email,
				bookingId,
				items: itemsForEmail,
				collectionTime,
				returnTime
			})
			this.props.setMessage(`Confirmation has been sent to ${email}`)
			console.log(response)
		} catch (error) {
			this.props.setMessage('We could not send the confirmation email.')
			console.log(error.response.data)
		}
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
			collectionTime: this.props.collectionTime,
			returnTime: this.props.returnTime,
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
				<p>
					<Link to="/loan">select more items</Link>
				</p>
				{loading ? 'loading' : ''}
				{haveItemsInCart ? itemElements : 'please select some items'}
				{haveItemsInCart ? (
					<button
						className="button"
						disabled={this.state.buttonDisabled}
						onClick={() =>
							this.newBooking(
								new Date(collectionDate),
								new Date(returnDate),
								newBooking
							)
						}
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
