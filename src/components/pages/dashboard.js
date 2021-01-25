import React from 'react'
import { withFirebase } from '../Firebase'
import BottomBar from '../skeleton/bottomBar'
import Booking from './dashboard/booking'
import { Link } from 'react-router-dom'
import withAuthorization from '../App/withAuthorization'
import './dashboard/dashboard.css'
import SignOut from './auth/SignOut'

class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {
            userBookings: []
        }
    }

    render() {
        let { authUser, bookings, items } = this.props
        let email = authUser ? authUser.email : 'loading@loading.com'
        let userBookings = []
        if (bookings) {
            // eslint-disable-next-line
            Object.keys(bookings).forEach(key => {
                let booking = bookings[key] 
                if (booking.email === email) {
                    let itemNames = Object.keys(booking.selectedItems).map(key => {
                        return <li key={key}>{items[key].name}</li>
                    })
                    userBookings.push(<Booking key={key} status={booking.status ? booking.status : 'Under Review'} id={key} date={booking.returnDate} itemNames={itemNames}/>)
                }
            })
        }
        return (
					<div className="dashboard__container user__container">
						<div className="user__logo"></div>
						<div className="tagline">welcome back!</div>
						<p className="text-center">
							<strong>{authUser ? authUser.email : ''}</strong>
						</p>
						<div className="dashboard__content">
							<section>
								<span className="dashboard__title">BOOKINGS</span>
								<div className="dashboard__bookings">
									{userBookings.length ? userBookings.reverse() : (
                                        <div>
                                                No bookings yet. Visit <Link to='/loan'>loan</Link> to make a booking.
                                        </div>
                                    )}
								</div>
							</section>
							<section>
								<span className="dashboard__title">what would you like to do?</span>
                                <SignOut>
                                    <div className="dashboard__link_image account"></div>
                                    sign out
                                </SignOut>
                                <Link to="/items" className="dashboard__link">
                                    <div className="dashboard__link_image search"></div>
                                    find an item
                                </Link>
							</section>
						</div>
						<BottomBar />
					</div>
				)
    }
}

const condition = (authUser) => !!authUser

export default withAuthorization(condition)(withFirebase(Dashboard))