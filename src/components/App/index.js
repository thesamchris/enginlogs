import React, { Component } from 'react'
import './App.css'
import { withFirebase } from '../Firebase'
// import firebase from 'firebase/app'
import 'firebase/auth'
import AddInitial from '../addInitial'
// import Details from '../booking/details'
import DetailsPage from '../pages/loan/details'
// import Cart from '../booking/cart'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import Display from '../items/display'
// import Header from  '../skeleton/header'
// import Categories from '../items/categories'
import Messages from './messages'
import HomePage from '../pages/home'
import ItemsPage from '../pages/items/index'
import DashboardPage from '../pages/dashboard'
// import withAuthProtection from './withAuthProtection'
// import Nav from '../skeleton/Nav'
import SignIn from '../pages/auth/SignIn'
import SignUp from '../pages/auth/SignUp'
// import Search from '../items/search'
import { SIGN_UP, SIGN_IN } from '../../constants/routes'
import LoaningItems from '../pages/loan/items'
import ConfirmBooking from '../pages/loan/confirm'
import axios from 'axios'
import ExportBookings from '../booking/exportBookings'
import GlobalSettings from '../pages/loan/globalSettings'
import BookingRequests from '../booking/requests'

class App extends Component {
	constructor() {
		super()
		this.state = {
			selectedItems: {},
			collectionDate: '',
			collectionTime: '',
			returnDate: '',
			returnTime: '',
			email: '',
			items: {},
			bookings: {},
			loading: false,
			message: '',
			showMessage: false,
			authUser: null,
			adminSettings: {}
		}
		this.selectItem = this.selectItem.bind(this)
		this.setBookingDetails = this.setBookingDetails.bind(this)
		this.setMessage = this.setMessage.bind(this)
		this.removeItem = this.removeItem.bind(this)
		this.increaseQuantity = this.increaseQuantity.bind(this)
		this.decreaseQuantity = this.decreaseQuantity.bind(this)
		this.newBooking = this.newBooking.bind(this)
		this.sendConfirmationEmail = this.sendConfirmationEmail.bind(this)
		this.updateCollectionAndReturnTimings = this.updateCollectionAndReturnTimings.bind(this)
		this.updateBookingStatus = this.updateBookingStatus.bind(this)
		this.approveBooking = this.approveBooking.bind(this)
		this.rejectBooking = this.rejectBooking.bind(this)
		this.deleteBooking = this.deleteBooking.bind(this)
	}

	updateCollectionAndReturnTimings(collectionTimeStart, collectionTimeEnd, returnTimeStart, returnTimeEnd, collectionTimeSameAsReturnTime) {
		let adminSettingsRef = this.props.firebase.adminSettings().child('timings')
		adminSettingsRef.child('collectionTimeStart').set(collectionTimeStart)
		adminSettingsRef.child('collectionTimeEnd').set(collectionTimeEnd)
		adminSettingsRef.child('returnTimeStart').set(returnTimeStart)
		adminSettingsRef.child('returnTimeEnd').set(returnTimeEnd)
		adminSettingsRef.child('collectionTimeSameAsReturnTime').set(collectionTimeSameAsReturnTime)
	}

	componentDidMount() {
		this.setState({ loading: true })

		this.props.firebase.initial().on('value', (snap) => {
			this.setState({
				loading: false,
				items: snap.val(),
			})
		})

		this.props.firebase.bookings().on('value', (snap) => {
			this.setState({
				bookings: snap.val(),
			})
		})

		this.listener = this.props.firebase.auth.onAuthStateChanged((authUser) => {
			authUser ? this.setState({ authUser }) : this.setState({ authUser: null })
		})

		this.props.firebase.adminSettings().on('value', (snap) => {
			this.setState({
				adminSettings: snap.val()
			})
		})
	}

	componentWillUnmount() {
		this.listener()
	}

	selectItem(key, quantity) {
		this.setState({
			selectedItems: {
				...this.state.selectedItems,
				[key]: quantity,
			},
		})
	}

	removeItem(key) {
		let { selectedItems } = this.state
		delete selectedItems[key]
		this.setState({
			selectedItems,
		})
	}

	increaseQuantity(key) {
		let { selectedItems } = this.state
		let currentQuantity = selectedItems[key]
		this.setState({
			selectedItems: {
				...selectedItems,
				[key]: currentQuantity + 1,
			},
		})
	}

	decreaseQuantity(key) {
		let { selectedItems } = this.state
		let currentQuantity = selectedItems[key]
		if (currentQuantity === 1) return this.removeItem(key)
		this.setState({
			selectedItems: {
				...selectedItems,
				[key]: currentQuantity - 1,
			},
		})
	}

	setBookingDetails(
		collectionDate,
		collectionTime,
		returnDate,
		returnTime,
		email
	) {
		this.setState({
			collectionDate,
			returnDate,
			email,
			collectionTime,
			returnTime,
		})
	}

	newBooking() {
		let {
			selectedItems,
			collectionDate: collectionDateText,
			collectionTime,
			returnTime,
			returnDate: returnDateText,
			email,
		} = this.state

		let collectionDate = new Date(collectionDateText)
		let returnDate = new Date(returnDateText)
		let newBooking = {
			collectionDate: collectionDateText,
			returnDate: returnDateText,
			selectedItems,
			collectionTime,
			returnTime,
			email,
			status: 'Under Review'
		}
		// days <= 7
		let newBookingRef = this.props.firebase.bookings().push()
		let { key: bookingId } = newBookingRef
		newBookingRef.set(newBooking)
		let j
		// eslint-disable-next-line
		Object.keys(newBooking.selectedItems).map((itemId) => {
			for (j = collectionDate; j <= returnDate; j.setDate(j.getDate() + 1)) {
				let day = j.toISOString().substring(0, 10)
				this.props.firebase.bookItem(itemId, day).update({
					[bookingId]: newBooking.selectedItems[itemId],
				})
			}
			collectionDate = new Date(newBooking.collectionDate)
		})
		
		// this.setMessage('Successful booking! Please check your email :)')
		window.location = '/dashboard'
	}

	async sendConfirmationEmail(
		bookingId,
		collectionDate,
		returnDate,
		newBooking
	) {
		// send email here
		let { email, selectedItems: items, collectionTime, returnTime } = newBooking
		try {
			let itemsForEmail = Object.keys(items).map((key) => {
				let itemName = this.props.items[key].name
				return {
					id: key,
					quantity: items[key],
					name: itemName,
				}
			})
			const response = await axios.post(
				'/.netlify/functions/send-confirmation-email',
				{
					collectionDate: collectionDate.toDateString(),
					returnDate: returnDate.toDateString(),
					email,
					bookingId,
					items: itemsForEmail,
					collectionTime,
					returnTime,
				}
			)
			this.props.setMessage(`Confirmation has been sent to ${email}`)
			console.log(response)
		} catch (error) {
			this.props.setMessage('We could not send the confirmation email.')
			console.log(error.response.data)
		}
	}

	setMessage(message) {
		this.setState({
			message,
			showMessage: true,
		})
		setTimeout(() => this.setState({ showMessage: false }), 5000)
	}

	approveBooking(bookingId, message) {
		this.props.firebase.particularBooking(bookingId).update({
			status: 'Approved',
			statusMessage: message
		})

		this.props.firebase.particularBooking(bookingId).on('value', snap => {
			let newBooking = snap.val()
			let { collectionDate, returnDate } = newBooking
			return this.sendConfirmationEmail(
				bookingId,
				collectionDate,
				returnDate,
				newBooking
			)
		})

		
	}

	rejectBooking(bookingId, message) {
		this.props.firebase.particularBooking(bookingId).update({
			status: 'Rejected',
			statusMessage: message
		})

		this.deleteBooking(bookingId, message)
	}

	deleteBooking(bookingId, message, updateDeleted = false) {

		this.props.firebase.particularBooking(bookingId).on('value', (snap) => {
			let booking = snap.val()
			let newBookings
			return Object.keys(booking.selectedItems).map(key => {
				return this.props.firebase.particularItemBookings(key).on('value', snap => {
					let oldBookings = snap.val()
					Object.keys(oldBookings).map(dayKey => {
						let dayObject = oldBookings[dayKey] 
						return newBookings = {
							...newBookings,
							[dayKey]: {
								...dayObject,
								[bookingId]: 0
							}
						}
					})
					return this.props.firebase.particularItemBookings(key).set(newBookings)
				})
			})
		})

		if (updateDeleted) {
			this.props.firebase.particularBooking(bookingId).update({
				status: 'Deleted',
				statusMessage: message
			})
		}
	}

	updateBookingStatus(bookingId, newStatus, message) {
		switch(newStatus) {
			case "Approved":
				this.approveBooking(bookingId, message)
				break;
			case "Rejected":
				this.rejectBooking(bookingId, message)
				break;
			case "Delete":
				this.deleteBooking(bookingId, message, true)
				break;
			default:
				break;
		}
	}

	render() {
		let {
			selectedItems,
			collectionDate,
			// collectionTime,
			// returnTime,
			returnDate,
			// email,
			items,
			// loading,
			authUser,
			bookings,
			adminSettings,
		} = this.state
		// let haveDateRange = collectionDate && returnDate

		return (
			<Router>
				<div>
					{/* <Header />
					<Nav authUser={authUser}/> */}
					<Messages
						showMessage={this.state.showMessage}
						message={this.state.message}
					/>
					<Switch>
						<Route
							path="/requests"
							render={() => (
								<BookingRequests
									bookings={bookings}
									items={items}
									updateBookingStatus={this.updateBookingStatus}
								/>
							)}
						/>
						<Route
							path="/export"
							render={(props) => (
								<ExportBookings setMessage={this.setMessage} items={items}/>
							)} 
						/>
						<Route
							path="/add"
							render={(props) => (
								<AddInitial
									{...props}
									user={this.state.user}
									setMessage={this.setMessage}
								/>
							)}
						/>
						<Route
							path="/dashboard"
							render={(props) => (
								<DashboardPage
									{...props}
									items={items}
									bookings={bookings}
									authUser={authUser}
								/>
							)}
						/>
						<Route
							path="/loan/confirm"
							render={(props) => (
								<ConfirmBooking
									{...props}
									selectedItems={selectedItems}
									collectionDate={collectionDate}
									returnDate={returnDate}
									items={items}
									increaseQuantity={this.increaseQuantity}
									decreaseQuantity={this.decreaseQuantity}
									authUser={authUser}
									setBookingDetails={this.setBookingDetails}
									newBooking={this.newBooking}
								/>
							)}
						/>
						<Route
							path="/loan"
							exact
							render={(props) => (
								<DetailsPage
									{...props}
									selectedItems={selectedItems}
									collectionDate={collectionDate}
									returnDate={returnDate}
									authUser={authUser}
									setBookingDetails={this.setBookingDetails}
									setMessage={this.setMessage}
									adminSettings={adminSettings}
								/>
							)}
						/>
						<Route
							path="/loan/items"
							render={(props) => (
								<LoaningItems
									{...props}
									collectionDate={collectionDate}
									returnDate={returnDate}
									items={items}
									selectedItems={selectedItems}
									selectItem={this.selectItem}
									removeItem={this.removeItem}
								/>
							)}
						/>
						<Route
							path="/loan/settings"
							render={(props) => (
								<GlobalSettings updateCollectionAndReturnTimings={this.updateCollectionAndReturnTimings}/>
							)} 
						/>
						<Route
							path="/items"
							render={(props) => (
								<ItemsPage
									{...props}
									collectionDate={collectionDate}
									returnDate={returnDate}
									selectItem={this.selectItem}
									selectedItems={selectedItems}
									items={items}
								/>
							)}
						/>

						<Route exact path={SIGN_IN} component={SignIn} />
						<Route path={SIGN_UP} component={SignUp} />
						{/* <Route path="/details">
							<Details
								selectedItems={selectedItems}
								collectionDate={collectionDate}
								returnDate={returnDate}
								email={email}
								setBookingDetails={this.setBookingDetails}
								setMessage={this.setMessage}
							/>
						</Route> */}
						{/* <Route path="/cart">
							<Cart
								selectItem={this.selectItem}
								selectedItems={selectedItems}
								collectionDate={collectionDate}
								returnDate={returnDate}
								haveDateRange={haveDateRange}
								items={items}
								loading={loading}
								email={email}
								setMessage={this.setMessage}
								collectionTime={collectionTime}
								returnTime={returnTime}
							/>
						</Route> */}
						{/* <Route path="/bookings">
							<div>show bookings</div>
						</Route> */}
						{/* <Route path="/view/sports">
							<Display items={items} category="sports" selectable={false} />
						</Route>
						<Route path="/view/electronics">
							<Display
								items={items}
								category="electronics"
								selectable={false}
							/>
						</Route>
						<Route path="/view/camp">
							<Display items={items} category="camp" selectable={false} />
						</Route>
						<Route path="/view/misc">
							<Display items={items} category="misc" selectable={false} />
						</Route>
						<Route path="/loan/sports">
							<Display
								collectionDate={collectionDate}
								returnDate={returnDate}
								selectItem={this.selectItem}
								selectable={true}
								category="sports"
								items={items}
							/>
						</Route>
						<Route path="/loan/electronics">
							<Display
								collectionDate={collectionDate}
								returnDate={returnDate}
								selectItem={this.selectItem}
								selectable={true}
								category="electronics"
								items={items}
							/>
						</Route>
						<Route path="/loan/camp">
							<Display
								collectionDate={collectionDate}
								returnDate={returnDate}
								selectItem={this.selectItem}
								selectable={true}
								category="camp"
								items={items}
							/>
						</Route>
						<Route path="/loan/misc">
							<Display
								collectionDate={collectionDate}
								returnDate={returnDate}
								selectItem={this.selectItem}
								selectable={true}
								category="misc"
								items={items}
							/>
						</Route>
						<Route path="/view">
							<Categories items={items} isLoan={false} />
						</Route>

						<Route path="/loan">
							<Display
								collectionDate={collectionDate}
								returnDate={returnDate}
								selectItem={this.selectItem}
								selectable={true}
							/>
						</Route>
						<Route path="/success">
							<p>Successful booking! thanks!</p>
						</Route>
						 */}

						{/* <Route path="/search">
							<Search items={items} />
						</Route> */}
						<Route exact path="/">
							<HomePage />
						</Route>
					</Switch>
				</div>
			</Router>
		)
	}
}

export default withFirebase(App)
