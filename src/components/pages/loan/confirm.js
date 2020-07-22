import React from 'react'
import { Link } from 'react-router-dom'
import Steps from './steps'
import BottomBar from '../../skeleton/bottomBar'

class ConfirmBookingPage extends React.Component {
    render() {
        let { collectionDate, returnDate, selectedItems } = this.props
        let isLoaningPeriodSet = collectionDate && returnDate
        let itemsHaveBeenSelected = Object.keys(selectedItems).length
        let readyToConfirm = itemsHaveBeenSelected && isLoaningPeriodSet
        return (
					<div className="loan__container user__container">
						<div className="user__logo"></div>
						<Steps />
						<div className="confirm__content">
							{readyToConfirm ? (
								<ConfirmContent />
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
        return (
            <div>hi</div>
        )
    }
}

export default ConfirmBookingPage