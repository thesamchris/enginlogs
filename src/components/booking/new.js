import React,  { Component } from 'react'
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
        this.setDetailsAndRedirect = this.setDetailsAndRedirect.bind(this)
        this.newBooking = this.newBooking.bind(this)
        this.updateState = this.updateState.bind(this)
    }

    validateDateRange(e) {
        e.preventDefault()
        // let newBookingRef = this.props.booking()
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
            this.newBooking(new Date(this.props.collectionDate), new Date(this.props.returnDate), newBooking)
        }

        
    }

    newBooking(collectionDate, returnDate, newBooking) {
        // days <= 7
        let newBookingRef = this.props.firebase.bookings().push()
        let { key: bookingId } = newBookingRef
        newBookingRef.set(newBooking)
        let j
        Object.keys(newBooking.selectedItems).map(itemId => {
            for (j = collectionDate; j <= returnDate; j.setDate(j.getDate() + 1)) {
                let day = j.toISOString().substring(0, 10)
                this.props.firebase.bookItem(itemId, day).update({
                    [bookingId]: newBooking.selectedItems[itemId]
                })
            }
            collectionDate = new Date(newBooking.collectionDate)
        })
    }

    setDetailsAndRedirect() {
        this.props.setBookingDetails(this.state.collectionDate, this.state.returnDate, this.state.email)
        return this.props.history.push('/loan')
    }

    updateState(e) {
        let { id, value } = e.target
        this.setState({
            [id]: value
        })
    }

    render() {
        let { error, message } = this.state
        let { setBookingDetails, selectedItems, collectionDate, returnDate, email } = this.props
        let isAllowedToMakeFinalBooking = (selectedItems && collectionDate && returnDate && email)
        return (
            <div>
                {error ? <h1>{ message }</h1> : ''}
                <input 
                    id="collectionDate" 
                    onChange={this.updateState} 
                    placeholder="Collection Date" 
                    value={this.state.collectionDate}
                    type="date" />
                
                <input 
                    id="returnDate" 
                    onChange={this.updateState} 
                    placeholder="Return Date" 
                    value={this.state.returnDate}
                    type="date" />
                
                <input 
                    id="email" 
                    onChange={this.updateState} 
                    placeholder="Email" 
                    value={this.state.email}
                    type="email" />

                
                <button onClick={this.setDetailsAndRedirect}>set booking details!</button>
                {/* <button disabled={!isAllowedToMakeFinalBooking} onClick={this.validateDateRange}>make booking!</button> */}
            </div>
        )
    }
}

export default withRouter(withFirebase(NewBooking))