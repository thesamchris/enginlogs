import React from 'react'

class BookingRequests extends React.Component {
    constructor() {
        super()
        this.state = {

        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        let { bookings, items, updateBookingStatus } = this.props
        let ActionableBookingRequests = Object.keys(bookings ? bookings : {}).map(key => {
            let booking = bookings[key]

            if (booking.status === 'Under Review' || booking.status === '') {
                let itemNames = Object.keys(booking.selectedItems).map(key => {
                    return <li key={key} className="list-group-item">{items[key].name}</li>
                })
                return (
                    <div key={key} className="card col-sm">
                        <div className="card-header">
                            <h5 className="card-title">{booking.email}</h5>
                        </div>
                        <div className="card-body">
                            <p className="card-text">{`${booking.collectionDate}(${booking.collectionTime}) — ${booking.returnDate}(${booking.returnTime})`}</p>
                            <textarea onChange={this.handleChange} className="form-control" name={key} rows="3"></textarea>
                        </div>
                        <ul className="list-group list-group-flush">
                            { itemNames }
                        </ul>
                        <div className="card-body">
                            <button disabled={this.state[key] ? false : true} onClick={() => updateBookingStatus(key, 'Approved', this.state[key])} type="button" className="btn btn-primary">Approve</button>
                            <button disabled={this.state[key] ? false : true} onClick={() => updateBookingStatus(key, 'Rejected', this.state[key])}type="button" className="btn btn-danger">Reject</button>
                            <button disabled={this.state[key] ? false : true} onClick={() => updateBookingStatus(key, 'Delete', this.state[key])}type="button" className="btn btn-dark">Delete</button>
                        </div>
                    </div>
                )
            }
        })

        let ReviewedRequests = Object.keys(bookings ? bookings : {}).map(key => {
            let booking = bookings[key]
            if (booking.status !== 'Under Review') {
                let itemNames = Object.keys(booking.selectedItems).map(key => {
                    return <li key={key} className={`list-group-item ${booking.status === 'Approved' ? 'list-group-item-success' : (booking.status === 'Rejected' ? 'list-group-item-danger' : 'list-group-item-dark')}`}>{items[key].name} ({booking.selectedItems[key]})</li>
                })
                return (
                    <div className={`card col-sm-5 mx-1 ${booking.status === 'Approved' ? 'bg-success' : (booking.status === 'Rejected' ? 'bg-danger' : 'text-white bg-dark')} mb-3`}>
                        <div className="card-header">{ booking.email }</div>
                        <div className="card-body">
                            <h5 className="card-title">{`${booking.collectionDate}(${booking.collectionTime}) — ${booking.returnDate}(${booking.returnTime})`}</h5>
                            <p className="card-text">
                                <ul className="list-group list-group-flush">
                                    {itemNames}
                                </ul>
                            </p>
                        </div>
                    </div>
                )
            }
        })
        return (
            <div className="container">
                <h1>Action Required</h1>
                <div className="row">
                    {ActionableBookingRequests ? ActionableBookingRequests : 'No requests.'}
                </div>
                <hr />
                <h1>Past Reviewed.</h1>
                <div className="row">
                    {ReviewedRequests}
                </div>

            </div>
        ) 
    }
}

export default BookingRequests
