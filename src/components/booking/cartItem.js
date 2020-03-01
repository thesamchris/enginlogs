import React, { Component } from 'react'
import amountAvailable from '../items/amountAvailable'

// TODO: max should be true available quantity at that moment
class CartItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            quantity: 0,
            maxValue: 0
        }

        this.updateState = this.updateState.bind(this)
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
    }

    componentDidMount() {
        let { itemData, collectionDate, returnDate } = this.props
        let maxValue = amountAvailable(itemData, collectionDate, returnDate)
        this.setState({
            maxValue
        })
    }

    updateState(e) {
        let { id, value } = e.target
        this.setState({
            [id]: value
        })
    }

    increment() {
        let newAmount = this.state.quantity + 1
        if (newAmount <= this.state.maxValue) {
            this.setState({
                quantity: newAmount
            })
            this.props.onChange(this.props.id, newAmount)
        } 
    }

    decrement() {
        let newAmount = this.state.quantity - 1
        if (newAmount >= 0) {
            this.setState({
                quantity: newAmount
            })
            this.props.onChange(this.props.id, newAmount)
        } 
    }
    
    render() {
       let {
            itemData,
            id,
            selectItem,
            collectionDate,
            returnDate,
            haveDateRange
        } = this.props
        let maxValue = amountAvailable(itemData, collectionDate, returnDate)
        
        return (
					<div>
						<p>{itemData.name}</p>
                        <button onClick={this.increment}>+</button>
                        <p>{this.state.quantity}</p>
                        <button onClick={this.decrement}>-</button>
						{/* <input
							onChange={this.props.onChange}
							id={id}
							type="number"
							value={this.props.selectedItems[id]}
							placeholder="0"
                            max={maxValue}
                            min={0}
						/> */}
						{haveDateRange
							? `there are ${maxValue} of ${itemData.quantity} available`
							: ''}
					</div>
				)
    }
} 

export default CartItem