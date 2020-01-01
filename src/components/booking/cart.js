import React, { Component } from 'react'
import { withFirebase } from '../Firebase/context'
import CartItem from './cartItem'

class Cart extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			items: {}
		}
	}

	render() {
		let { collectionDate, returnDate, selectedItems, loading, items } = this.props
        let itemElements
        let haveItemsInCart = !(Object.entries(selectedItems).length === 0)
		if (selectedItems) {
			itemElements = Object.keys(selectedItems).map(key => (
				<CartItem
					key={key}
					id={key}
					collectionDate={collectionDate}
					returnDate={returnDate}
					itemData={items[key]}
					selectItem={this.props.selectItem}
					haveDateRange={this.props.haveDateRange}
				/>
			))
		}
		return (
			<div>
				<h1>Cart</h1>
				{loading ? 'loading' : ''}
				{haveItemsInCart ? itemElements : 'please select some items'}
			</div>
		)
	}
}

export default withFirebase(Cart)
