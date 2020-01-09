import React, { Component } from 'react'
import View from './view'
import Loan from './loan'
import { withFirebase } from '../Firebase/context'

class Display extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			itemKeys: {}
		}

		this.categoryItems = this.categoryItems.bind(this)
	}

	componentDidMount() {
		this.setState({ loading: true })
		this.props.firebase.initial().orderByChild('category').equalTo(this.props.category).on('child_added', snap => {
			this.setState({
				loading: false,
				itemKeys: {
					...this.state.itemKeys,
					[snap.key]: true
				}
			})
		})
	}

	categoryItems(itemKeys, items) {
		return Object.keys(itemKeys).map(key => items[key] ? items[key] : {})
	}

	render() {
		let { selectable, selectItem, collectionDate, returnDate, items, category } = this.props
		let { loading, itemKeys } = this.state
		let toDisplay
		if (!items && !itemKeys) {
			toDisplay = 'no items'
		} else if (items && itemKeys && !selectable) {
			toDisplay = (
				<View category={category} items={this.categoryItems(itemKeys, items)} />
			)
		} else if (items && itemKeys && selectable) {
			toDisplay = (
				<Loan
					collectionDate={collectionDate}
					returnDate={returnDate}
					selectItem={selectItem}
					items={this.categoryItems(itemKeys, items)}
					itemKeys={itemKeys}
				/>
			)
		}

		
		return (
			<div>
				{toDisplay}
				{loading ? 'loading' : ''}
			</div>
		)
	}
}

export default withFirebase(Display)
