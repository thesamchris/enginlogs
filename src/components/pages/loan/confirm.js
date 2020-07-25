import React from 'react'
import { Link } from 'react-router-dom'
import Steps from './steps'
import BottomBar from '../../skeleton/bottomBar'
import './loan.css'
import amountAvailable from '../../items/amountAvailable'

class ConfirmBookingPage extends React.Component {
    render() {
        let { collectionDate, returnDate, selectedItems, items, increaseQuantity, decreaseQuantity } = this.props
        let isLoaningPeriodSet = collectionDate && returnDate
        let itemsHaveBeenSelected = Object.keys(selectedItems).length
        let readyToConfirm = itemsHaveBeenSelected && isLoaningPeriodSet
        return (
					<div className="loan__container user__container">
						<div className="user__logo"></div>
						<Steps />
						<div className="confirm__content">
							{readyToConfirm ? (
								<ConfirmContent selectedItems={selectedItems} collectionDate={collectionDate} returnDate={returnDate} items={items} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity}/>
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
    render() {
        let { selectedItems, collectionDate, returnDate, items, increaseQuantity, decreaseQuantity } = this.props
        let confirmedItems = Object.keys(selectedItems).map(itemId => {
            let item = items[itemId]
            let quantity = selectedItems[itemId]
            return <ConfirmedItem key={itemId} itemId={itemId} name={item.name} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} quantity={quantity} max={amountAvailable(itemId, collectionDate, returnDate)}/>
        })
        return (
            <div>
                { confirmedItems }
            </div>
        )
    }
}

const ConfirmedItem = ({ itemId, name, increaseQuantity, decreaseQuantity, quantity, max }) => (
    <div className="confirmed_item">
        { name }
        <div className="confirmed_item__quantity_controls">
            <button onClick={() => increaseQuantity(itemId, max)}>+</button>
            <div>{ quantity }</div>
            <button onClick={() => decreaseQuantity(itemId)}>-</button>
        </div>
    </div>
)
export default ConfirmBookingPage