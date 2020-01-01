import React, { Component } from 'react'
import amountAvailable from '../items/amountAvailable'

// TODO: max should be true available quantity at that moment
class SelectItem extends Component {
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
        let { itemData, id, selectItem, collectionDate, returnDate } = this.props
        return (
            <div>
                {itemData.name}
                {id}
                <input onChange={this.updateState} id="quantity" type="number" value={this.state.quantity} placeholder="0" max={itemData.quantity} />
                <button onClick={() => selectItem(id, this.state.quantity)}>Select</button>
                there are { amountAvailable(itemData, collectionDate, returnDate) } of { itemData.quantity } available
            </div>
        )
    }
} 

export default SelectItem