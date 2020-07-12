import React from 'react'
import { withFirebase } from '../Firebase'
import BottomBar from '../skeleton/bottomBar'

class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {
            userBookings: []
        }
    }

    render() {
        let { authUser, bookings } = this.props
        let email = authUser ? authUser.email : 'loading@loading.com'
        let userBookings = Object.keys(bookings).map(key => {
            let booking = bookings[key] 
            if (booking.email == email) {
                return <li key={key}>{key} due by {booking.returnDate}</li>
            }
        })
        return (
            <div className="dashboard__container user__container">
                <div className="user__logo"></div>
                <div className="tagline">welcome back!</div>
                <p className="text-center"><strong>{ authUser ? authUser.email : '' }</strong></p>
                your booking ids are:
                <ul>{ userBookings ? userBookings : 'loading' }</ul>
                <BottomBar />
            </div>
        )
    }
}

export default withFirebase(Dashboard)