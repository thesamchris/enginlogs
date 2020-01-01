import React, { Component } from 'react'
import { withFirebase } from '../Firebase/context'
import { withRouter } from 'react-router-dom'

class NewBooking extends Component {
	constructor() {
		super()
		this.state = {
			collectionDate: '',
			returnDate: '',
			items: {},
			email: '',
			error: false,
			message: ''
		}
		this.validateDateRange = this.validateDateRange.bind(this)
		this.updateState = this.updateState.bind(this)
	}

	validateDateRange() {
		let newBooking = {
			collectionDate: this.props.collectionDate,
			returnDate: this.props.returnDate,
			selectedItems: this.props.selectedItems,
			email: this.props.email
		}
		let collectionDate = new Date(newBooking.collectionDate)
		let returnDate = new Date(newBooking.returnDate)
		let numberOfDays = 0
		let i
		for (i = collectionDate; i < returnDate; i.setDate(i.getDate() + 1)) {
			numberOfDays++
			if (numberOfDays > 7) {
				break
			}

			// for each day, take away {quantity} of each {item}
		}

		if (numberOfDays > 7) {
			this.setState({
				message: 'cannot loan items for more than a week',
				error: true
			})
            setTimeout(() => this.setState({ error: false }), 5000)
		} else {
			this.props.setBookingDetails(
				this.state.collectionDate,
				this.state.returnDate,
				this.state.email
			)
			return this.props.history.push('/loan')
		}
    }
    
	updateState(e) {
		let { id, value } = e.target
		this.setState({
			[id]: value
		})
	}

	render() {
		let { error, message } = this.state
		let {
			setBookingDetails,
			selectedItems,
			collectionDate,
			returnDate,
			email
		} = this.props
		let isAllowedToMakeFinalBooking =
			selectedItems && collectionDate && returnDate && email
		return (
			<div>
				{error ? <h1>{message}</h1> : ''}
				<input
					id="collectionDate"
					onChange={this.updateState}
					placeholder="Collection Date"
					value={this.state.collectionDate}
					type="date"
				/>

				<input
					id="returnDate"
					onChange={this.updateState}
					placeholder="Return Date"
					value={this.state.returnDate}
					type="date"
				/>

				<input
					id="email"
					onChange={this.updateState}
					placeholder="Email"
					value={this.state.email}
					type="email"
				/>

				<button onClick={this.validateDateRange}>
					set booking details!
				</button>
			</div>
		)
	}
}

export default withRouter(withFirebase(NewBooking))
