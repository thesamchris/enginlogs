import React from 'react'
import { withFirebase } from '../Firebase'

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
            <div>
                <h1>hello { authUser ? authUser.email : '' } </h1>
                your booking ids are:
                <ul>{ userBookings ? userBookings : 'loading' }</ul>
            </div>
        )
    }
}

export default withFirebase(Dashboard)