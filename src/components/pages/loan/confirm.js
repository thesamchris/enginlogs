import React from 'react'
import { Link } from 'react-router-dom'
import Steps from './steps'
import BottomBar from '../../skeleton/bottomBar'
import './loan.css'
import amountAvailable from '../../items/amountAvailable'
import withAuthorization from '../../App/withAuthorization'

class ConfirmBookingPage extends React.Component {
    render() {
        let { collectionDate, returnDate, selectedItems, items, increaseQuantity, decreaseQuantity, newBooking } = this.props
        let isLoaningPeriodSet = collectionDate && returnDate
        let itemsHaveBeenSelected = Object.keys(selectedItems).length
        let readyToConfirm = itemsHaveBeenSelected && isLoaningPeriodSet
        return (
					<div className="loan__container user__container">
						<div className="user__logo"></div>
						<Steps />
						<div className="confirm__content">
							{readyToConfirm ? (
								<ConfirmContent selectedItems={selectedItems} collectionDate={collectionDate} returnDate={returnDate} items={items} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} newBooking={newBooking}/>
							) : (
								<ErrorMessage
									isLoaningPeriodSet={isLoaningPeriodSet}
									itemsHaveBeenSelected={itemsHaveBeenSelected}
								/>
							)}
						</div>
						<BottomBar />
					</div>
				)
    }
}

const ErrorMessage = ({ isLoaningPeriodSet, itemsHaveBeenSelected }) => {
	let errorMessageToShow = isLoaningPeriodSet ? (
		<MessageToSelectItems />
	) : (
		<MessageToSetLoaningPeriod />
	)
	return <div>{errorMessageToShow}</div>
}

const MessageToSetLoaningPeriod = () => (
    <div style={{
        width: '100%',
        height: '50vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <p>Please fill in the loaning period first</p>
        <Link to="/loan" className="loan__button">{"< back"}</Link>
    </div>
)

const MessageToSelectItems = () => (
    <div style={{
        width: '100%',
        height: '50vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <p>Please select items first</p>
        <Link to="/loan/items" className="loan__button">{"< back"}</Link>
    </div>
)

class ConfirmContent extends React.Component {
    constructor() {
        super()

        this.state = {
            agreement: false
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const target = event.target
        const value = target.name === 'agreement' ? target.checked : target.value
        const name = target.name

        this.setState({
            [name]: value,
        })
    }

    render() {
        let { selectedItems, collectionDate, returnDate, items, increaseQuantity, decreaseQuantity, newBooking } = this.props
        let { agreement } = this.state
        let confirmedItems = Object.keys(selectedItems).map(itemId => {
            let item = items[itemId]
            let quantity = selectedItems[itemId]
            return <ConfirmedItem key={itemId} itemId={itemId} name={item.name} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} quantity={quantity} max={amountAvailable(item, collectionDate, returnDate)} />
        })
        return (
            <div className="confirm_content_div">
                <p className="confirm__title">select quantities</p>
                <div className="confirmed_items__container">
                    { confirmedItems }
                </div>
                <div className="confirm__agreement">
                    <input type="checkbox" name="agreement" checked={agreement} onChange={this.handleChange} />
                    <label htmlFor="agreement">I agree to return the items by the return date at the return time in prestine condition. If there is any damage to the items, I will bear the 100% cost required to either purchase a new unit(s) of the item or perform the repairs.</label>
                </div>
                <button style={{margin: '0 auto'}} disabled={!agreement} onClick={() => newBooking()} className="loan__button" >{"confirm"}</button>
            </div>
        )
    }
}

const ConfirmedItem = ({ itemId, name, increaseQuantity, decreaseQuantity, quantity, max }) => (
    <div className="confirmed_item">
        { name }
        <div className="confirmed_item__quantity_controls">
            <button disabled={ parseInt(quantity) === parseInt(max) } onClick={() => { 
                if (parseInt(quantity) < parseInt(max))
                    increaseQuantity(itemId) 
            }}>+</button>
            <div>{ quantity }</div>
            <button onClick={() => decreaseQuantity(itemId)}>-</button>
        </div>
    </div>
)

const condition = (authUser) => !!authUser

export default withAuthorization(condition)(ConfirmBookingPage)