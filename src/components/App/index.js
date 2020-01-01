import React, { Component } from 'react'
import './App.css'
import { withFirebase } from '../Firebase/context'
import AddInitial from '../addInitial'
import Details from '../booking/details'
import Cart from '../booking/cart'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Display from '../items/display'

class App extends Component {
	constructor() {
		super()
		this.state = {
			selectedItems: {},
			collectionDate: '',
			returnDate: '',
			email: '',
			items: {},
			loading: false
		}
		this.selectItem = this.selectItem.bind(this)
		this.setBookingDetails = this.setBookingDetails.bind(this)
	}

	componentDidMount() {
		this.setState({ loading: true })

		this.props.firebase.initial().on('value', snap => {
			this.setState({
				loading: false,
				items: snap.val()
			})
		})
	}

	selectItem(key, quantity) {
		this.setState({
			selectedItems: {
				...this.state.selectedItems,
				[key]: quantity
			}
		})
	}

	setBookingDetails(collectionDate, returnDate, email) {
		this.setState({
			collectionDate,
			returnDate,
			email
		})
	}

	render() {
		let {
			selectedItems,
			collectionDate,
			returnDate,
			email,
			items,
			loading
		} = this.state
		let haveDateRange = collectionDate && returnDate
		return (
			<Router>
				<div className="app">
					<nav>
						<Link to="/">home</Link>
						<Link to="/cart">cart</Link>
					</nav>
					<Switch>
						<Route path="/add">
							<AddInitial />
							<div>for add initial item, add functionality to add category</div>
						</Route>
						<Route path="/details">
							<Details
								selectedItems={selectedItems}
								collectionDate={collectionDate}
								returnDate={returnDate}
								email={email}
								setBookingDetails={this.setBookingDetails}
							/>
						</Route>
						<Route path="/cart">
							<Cart
								selectItem={this.selectItem}
								selectedItems={selectedItems}
								collectionDate={collectionDate}
								returnDate={returnDate}
								haveDateRange={haveDateRange}
								items={items}
								loading={loading}
								email={email}
							/>
						</Route>
						<Route path="/bookings">
							<div>show bookings</div>
						</Route>
						<Route path="/view">
							<Display selectable={false} />
							{/* <div>
                show items (add functionality to show amount based on date
                selected, filterbased on category as well please)
              </div>
              <ShowItems /> */}
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
						<Route path="/">
							<div className="buttonsContainer">
								<Link className="homeButton" to="/view">
									view
								</Link>
								<Link className="homeButton" to="/details">
									loan
								</Link>
							</div>
						</Route>
					</Switch>
				</div>
			</Router>
		)
	}
}

export default withFirebase(App)
