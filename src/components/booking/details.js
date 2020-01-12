import React, { Component } from 'react'
import { withFirebase } from '../Firebase/context'
import { withRouter } from 'react-router-dom'
import './details.css'

class Details extends Component {
	constructor() {
		super()
		this.state = {
			collectionDate: '',
			returnDate: '',
			email: '',
			error: false,
			message: '',
			collectionTime: '12:00',
			returnTime: '12:00'
		}
		this.validateDateRange = this.validateDateRange.bind(this)
		this.updateState = this.updateState.bind(this)
	}

	validateDateRange(e) {
		e.preventDefault()
		let collectionDate = new Date(this.state.collectionDate)
		let returnDate = new Date(this.state.returnDate)
		let numberOfDays = 0
		let i
		for (i = collectionDate; i < returnDate; i.setDate(i.getDate() + 1)) {
			numberOfDays++
			if (numberOfDays > 7) {
				break
			}
		}
		// error if: 1. collect and return more than a week apart, 2. if return is before collection
		if (numberOfDays > 7) {
			this.props.setMessage('cannot loan items for more than a week')
		} else {
			this.props.setBookingDetails(
				this.state.collectionDate,
				this.state.collectionTime,
				this.state.returnDate,
				this.state.returnTime,
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
		return (
			<div className="details__container">
				{error ? <h1>{message}</h1> : ''}
				<div className="input__container">
					<label className="input__label" htmlFor="collectionDate">Collection Date</label>
					<input
						id="collectionDate"
						onChange={this.updateState}
						placeholder="Collection Date"
						value={this.state.collectionDate}
						type="date"
					/>
					<label className="input__label" htmlFor="collectionTime">Collection Time</label>
					<select id="collectionTime" onChange={this.updateState} value={this.state.collectionTime}>
						<option value="12:00">12:00</option>
						<option value="12:15">12:15</option>
						<option value="12:30">12:30</option>
						<option value="13:00">13:00</option>
						<option value="13:15">13:15</option>
						<option value="13:30">13:30</option>
						<option value="13:45">13:45</option>
                	</select>
				</div>
				<div className="input__container">
					<label className="input__label" htmlFor="returnDate">Return Date</label>
					<input
						id="returnDate"
						onChange={this.updateState}
						placeholder="Return Date"
						value={this.state.returnDate}
						type="date"
					/>
					<label className="input__label" htmlFor="returnTime">Return Time</label>
					<select id="returnTime" onChange={this.updateState} value={this.state.returnTime}>
						<option value="12:00">12:00</option>
						<option value="12:15">12:15</option>
						<option value="12:30">12:30</option>
						<option value="13:00">13:00</option>
						<option value="13:15">13:15</option>
						<option value="13:30">13:30</option>
						<option value="13:45">13:45</option>
                	</select>
				</div>
				<div className="input__container">
					<label className="input__label" htmlFor="email">Email</label>
					<input
						id="email"
						onChange={this.updateState}
						placeholder="Email"
						value={this.state.email}
						type="email"
					/>
				</div>

				<button className="button" onClick={this.validateDateRange}>
					set booking details
				</button>
			</div>
		)
	}
}

export default withRouter(withFirebase(Details))
