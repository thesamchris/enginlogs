import React,  { Component } from 'react'
import { withFirebase } from '../Firebase/context'

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
        this.newBooking = this.newBooking.bind(this)
        this.updateState = this.updateState.bind(this)
    }

    newBooking(e) {
        e.preventDefault()
        // let newBookingRef = this.props.booking()
        let newBooking = {
            collectionDate: this.state.collectionDate,
            returnDate: this.state.returnDate
        }
        let collectionDate = new Date(newBooking.collectionDate)
        let returnDate = new Date(newBooking.returnDate)
        let numberOfDays = 0;
        for (let i = collectionDate; i < returnDate; i.setDate(i.getDate() + 1)) {
            let day = i.toISOString().substring(0, 10)
            numberOfDays++
            if (numberOfDays > 7) {
                this.setState({
                    message: 'cannot loan items for more than a week',
                    error: true
                })
                setTimeout(() => this.setState({ error: false }), 5000)
                break;
            }

            // for each day, take away {quantity} of each {item}
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

                items
                quantity of each item

                
                <button onClick={this.newBooking}>new booking!</button>
            </div>
        )
    }
}

export default withFirebase(NewBooking)