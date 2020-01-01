import React, { Component } from 'react'
// import './App.css'
import AddInitial from '../addInitial'
import ShowItems from '../showItems'
import NewBooking from '../booking/new'
import SelectItems from '../booking/selectItems'

class App extends Component {
  constructor() {
    super()
    this.state = {
      selectedItems: {},
      collectionDate: '',
      returnDate: '',
      email: ''
    }
    this.selectItem = this.selectItem.bind(this)
    this.setBookingDetails = this.setBookingDetails.bind(this)
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
    let { selectedItems, collectionDate, returnDate, email } = this.state
    return (
      <div className="App">
        <AddInitial />
        <div>for add initial item, add functionality to add category</div>
        <div>show items (add functionality to show amount based on date selected, filterbased on category as well please)</div>
        <ShowItems />
        <div>add booking</div>
        <SelectItems selectItem={this.selectItem} collectionDate={collectionDate} returnDate={returnDate} />
        <NewBooking selectedItems={selectedItems} collectionDate={collectionDate} returnDate={returnDate} email={email} setBookingDetails={this.setBookingDetails}/>
        <div>show bookings</div>
      </div>
    )
  }
}

export default App;
