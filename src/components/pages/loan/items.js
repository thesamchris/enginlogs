import React from 'react'
import { withRouter } from 'react-router'
import { withFirebase } from '../../Firebase'
import { Link } from 'react-router-dom'
import Steps from './steps'
import BottomBar from '../../skeleton/bottomBar'
import './loan.css'
import '../../items/search.css'
import amountAvailable from '../../items/amountAvailable'
import ViewCart from './viewCart'

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

class LoaningItems extends React.Component {
    render() {
        let { collectionDate, returnDate, items, selectItem, selectedItems, removeItem } = this.props
        return (
            <div className="loan__container user__container">
				<div className="user__logo"></div>
				<Steps />
                <div className="loan__content_container">
                    { collectionDate && returnDate ? <SelectItemsToLoan collectionDate={collectionDate} returnDate={returnDate} items={items} selectedItems={selectedItems} selectItem={selectItem} removeItem={removeItem}/> : (
                        <MessageToSetLoaningPeriod />
                    )}
                </div>
                <BottomBar />
			</div>
        )
    }
}


class SelectItem extends React.Component {
    render() {
        let { item, isSelected, selectItem, itemId, removeItem } = this.props
        return (
					<button onClick={() => isSelected ? removeItem(itemId) : selectItem(itemId, 1)}className="loan_page__item_card">
						<strong>{item.name}</strong>
						<div className="grow"></div>
						<div
							className={`item_card__image ${isSelected ? 'remove' : 'add'}`}
						></div>
					</button>
				) 
    }
}

class SelectItemsToLoan extends React.Component {
	constructor() {
        super()
        this.state = {
            search: ''
        }
	}

	onChange = (event) => {
		this.setState({ [event.target.name]: event.target.value })
	}

	render() {
		const {
			collectionDate,
			returnDate,
			items,
			selectItem,
			selectedItems,
			removeItem,
        } = this.props
        
        const { search } = this.state

		let relevantItems = (search === '' ? items : {})
		// eslint-disable-next-line
        Object.keys(items).map((key) => {
            let item = items[key]
            if (
                search &&
                (item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.category.toLowerCase().includes(search.toLowerCase()))
            )
                relevantItems[key] = item
        })
                
		const itemsAvailableToSelect = Object.keys(relevantItems).map((itemId, key) => {
			let item = items[itemId]
			if (amountAvailable(item, collectionDate, returnDate) > 0) {
				let isSelected = selectedItems[itemId] ? true : false
				return (
					<SelectItem
						itemId={itemId}
						key={itemId}
						selectItem={selectItem}
						item={item}
						isSelected={isSelected}
						removeItem={removeItem}
					/>
				)
			}

			return ''
		})

		return (
			<div>
				<input
					name="search"
					value={search}
					onChange={this.onChange}
					type="text"
					placeholder="Search for item ..."
					className="search_input"
				/>
                <div className="loan_page__items_container">
				    {itemsAvailableToSelect}
                </div>
                <div className="items_page___button_container">
                    <ViewCart items={items} selectedItems={selectedItems}/>
                    <Link disabled={!Object.keys(selectedItems).length} className="loan__button" to="/loan/confirm">{"next >"}</Link>
                </div>
			</div>
		)
	}
}


export default withFirebase(withRouter(LoaningItems))