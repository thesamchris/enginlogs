import React, { Component } from 'react'
import amountAvailable from '../items/amountAvailable'

// TODO: max should be true available quantity at that moment
class CartItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            quantity: ''
        }

        this.updateState = this.updateState.bind(this)
    }

    updateState(e) {
        let { id, value } = e.target
        this.setState({
            [id]: value
        })
    }
    
    render() {
        let { itemData, id, selectItem, collectionDate, returnDate, haveDateRange } = this.props
        let maxValue = amountAvailable(itemData, collectionDate, returnDate)
        return (
					<div>
						<p>{itemData.name}</p>
						<input
							onChange={this.props.onChange}
							id={id}
							type="number"
							value={this.props.selectedItems[id]}
							placeholder="0"
                            max={maxValue}
                            min={0}
						/>
						{haveDateRange
							? `there are ${maxValue} of ${itemData.quantity} available`
							: ''}
					</div>
				)
    }
} 

export default CartItem