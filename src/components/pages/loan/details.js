import React from 'react'
import BottomBar from '../../skeleton/bottomBar'
import { withRouter } from 'react-router'
import withAuthorization from '../../App/withAuthorization'
import Steps from './steps'
import './loan.css'

class DetailsPage extends React.Component {
	constructor() {
		super()
		this.state = {
			collectionDate: '',
			returnDate: '',
			email: '',
			error: false,
			message: '',
			collectionTime: '12:00',
			returnTime: '12:00',
		}
		this.validateDateRange = this.validateDateRange.bind(this)
		this.updateState = this.updateState.bind(this)
		this.areSameDay = this.areSameDay.bind(this)
	}

	validateDateRange(e) {
		e.preventDefault()
		let collectionDate = new Date(this.state.collectionDate)
		let returnDate = new Date(this.state.returnDate)
		let { collectionTime, returnTime } = this.state
		let today = new Date()
		let numberOfDays = 0
		let i
		for (i = collectionDate; i < returnDate; i.setDate(i.getDate() + 1)) {
			numberOfDays++
			if (numberOfDays > 7) {
				break
			}
		}

		// 19 September 2020, Removed 1 Week Limit after discussion
		// error if: 1. collect and return more than a week apart, 2. if return is before collection
		// if (numberOfDays > 7) {
		// 	return this.props.setMessage('Cannot loan for more than a week')
		// }

		let collectionDateOriginal = new Date(this.state.collectionDate)
		if (returnDate < collectionDateOriginal) {
			return this.props.setMessage('Collection date must be before return date')
		}

		if (
			this.areSameDay(collectionDateOriginal, today) ||
			collectionDateOriginal < today ||
			this.areSameDay(returnDate, today)
		) {
			return this.props.setMessage(
				'Collection date cannot be today or before today'
			)
		}

		let collectionTimeInt = parseInt((collectionTime).replace(/:/g,''))
		let returnTimeInt = parseInt((returnTime).replace(/:/g,''))

		if (this.areSameDay(collectionDateOriginal, returnDate) && returnTimeInt <= collectionTimeInt) {
			return this.props.setMessage('Return time must be after collection time')
		}

		this.props.setBookingDetails(
			this.state.collectionDate,
			this.state.collectionTime,
			this.state.returnDate,
			this.state.returnTime,
			this.props.authUser.email
		)
		return this.props.history.push('/loan/items')
	}

	areSameDay(first, second) {
		return (
			first.getFullYear() === second.getFullYear() &&
			first.getMonth() === second.getMonth() &&
			first.getDate() === second.getDate()
		)
	}

	updateState(e) {
		let { id, value } = e.target
		this.setState({
			[id]: value,
		})
	}

	render() {
        // let { error, message } = this.state
        let {
            collectionDate,
            collectionTime,
            returnDate,
            returnTime,
		} = this.state
		let { authUser } = this.props
        let canSubmit =
            collectionDate && collectionTime && returnDate && returnTime && authUser.email 
		return (
			<div className="loan__container user__container">
				<div className="user__logo"></div>
				<Steps />
				<div className="loan__content_container details__input_container">
					<div className="input__container">
						<label className="input__label" htmlFor="collectionDate">
							Collection Date
						</label>
						<input
							id="collectionDate"
							onChange={this.updateState}
							placeholder="Collection Date"
							value={this.state.collectionDate}
							type="date"
						/>
						<label className="input__label" htmlFor="collectionTime">
							Collection Time
						</label>
						<select
							id="collectionTime"
							onChange={this.updateState}
							value={this.state.collectionTime}
						>
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
						<label className="input__label" htmlFor="returnDate">
							Return Date
						</label>
						<input
							id="returnDate"
							onChange={this.updateState}
							placeholder="Return Date"
							value={this.state.returnDate}
							type="date"
						/>
						<label className="input__label" htmlFor="returnTime">
							Return Time
						</label>
						<select
							id="returnTime"
							onChange={this.updateState}
							value={this.state.returnTime}
						>
							<option value="12:00">12:00</option>
							<option value="12:15">12:15</option>
							<option value="12:30">12:30</option>
							<option value="13:00">13:00</option>
							<option value="13:15">13:15</option>
							<option value="13:30">13:30</option>
							<option value="13:45">13:45</option>
						</select>
					</div>

					<button
						disabled={!canSubmit}
						className="loan__button"
						onClick={this.validateDateRange}
					>
						{"next >"}
					</button>
				</div>
				<BottomBar />
			</div>
		)
	}
}

const condition = (authUser) => !!authUser

export default withAuthorization(condition)(withRouter(DetailsPage))