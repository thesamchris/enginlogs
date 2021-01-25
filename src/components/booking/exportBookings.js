import React from 'react'
import { withFirebase } from '../Firebase/index'
import './export.css'
import withAuthorization from '../App/withAuthorization'

class ExportBookings extends React.Component {
	constructor() {
		super()
		this.state = {
			fromDate: (new Date()).toISOString().split('T')[0],
            toDate: (new Date()).toISOString().split('T')[0],
            bookings: {}
        }
        
        this.updateState = this.updateState.bind(this)
        this.validateDate = this.validateDate.bind(this)
    }
    
    componentDidMount() {
        this.props.firebase.bookings().on('value', snap => this.setState({ bookings: snap.val() }))
    }

	updateState(e) {
		let { id, value } = e.target
		this.setState({
			[id]: value,
		})
    }
    
    validateDate(fromDate, toDate) {
        if (toDate < fromDate)
            return this.props.setMessage('To date has to be after for date')
    }

	render() {
        let { bookings } = this.state
        let { items } = this.props
        let filteredBookings = []
        let fromDate = new Date(this.state.fromDate)
        let toDate = new Date(this.state.toDate)
        let count = 0
        if (Object.keys(bookings).length) {
            // eslint-disable-next-line
            Object.keys(bookings).map(key => {
                let booking = bookings[key]
                let bookingCollection = new Date(booking.collectionDate)
                let bookingReturn = new Date(booking.returnDate)
                
                if (toDate < fromDate) {
                // eslint-disable-next-line
                    return
                }
                if (!bookingCollection || !bookingCollection) {
                // eslint-disable-next-line
                    return
                }
                if ((bookingCollection <= toDate) && (bookingReturn >= fromDate)) {
                    count++
                    return filteredBookings.push({
                        ...booking,
                        key,
                        count,
                    })
                }
            })
        }

        let rows = (<tr>loading</tr>)
        if (filteredBookings.length && Object.keys(items).length) {
            // eslint-disable-next-line
            rows = filteredBookings.map(booking => {
            let bookingItems = Object.keys(booking.selectedItems).map(itemKey => <li key={itemKey}>{items[itemKey].name} ({booking.selectedItems[itemKey]} units)</li>) 
                return (
                    <tr key={booking.key}>
                        <td>{booking.count}</td>
                        <td>{booking.key}</td>
                        <td>{booking.email}</td>
                        <td>{(new Date(booking.collectionDate)).toDateString()} at {booking.collectionTime}</td>
                        <td>{(new Date(booking.returnDate)).toDateString()} at {booking.returnTime}</td>
                        <td>
                            <ul>
                                { bookingItems }
                            </ul>
                        </td>
                    </tr>
                )
            })
        }

		return (
			<div style={{ color: 'var(--grey)', margin: '20px auto', maxWidth: '90vw', display: 'flex', flexDirection: 'column' }}>
				<div>
					<input
						id="fromDate"
						onChange={this.updateState}
						placeholder="From Date"
						value={this.state.fromDate}
						type="date"
					/>
					<input
						id="toDate"
						onChange={this.updateState}
						placeholder="To Date"
						value={this.state.toDate}
						type="date"
					/>
                    {
                        rows.length ? (
                        <table style={{ marginTop: '40px' }}>
                            <thead>
                                <tr>
                                    <th>Row No.</th>
                                    <th>Booking ID</th>
                                    <th>Contact Email</th>
                                    <th>Collection</th>
                                    <th>Return</th>
                                    <th>Items</th>
                                </tr>
                            </thead>
                            <tbody>
                                { rows }
                            </tbody>
                        </table>
                    ) : (<p>No bookings in this date range.</p>)
                    }
                    
				</div>
			</div>
		)
	}
}

const condition = (authUser) => (authUser.email === 'logistics@enginclub.com' || authUser.email === 'hellosamchris@gmail.com')

export default withAuthorization(condition, '/dashboard')(withFirebase(ExportBookings))