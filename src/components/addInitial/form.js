import React from 'react'

class AddIntialForm extends React.Component {
    constructor() {
        super()
        this.state = {
            itemName: '',
            itemQuantity: '',
            category: 'camp'
        }
        this.addNewItem = this.addNewItem.bind(this)
        this.updateState = this.updateState.bind(this)
    }

    addNewItem(e) {
        e.preventDefault()
        let newItemRef = this.props.initialRef.push()
        let newItem = {
            name: this.state.itemName,
            quantity: this.state.itemQuantity,
            category: this.state.category
        }

        newItemRef.set({...newItem})
    }

    updateState(e) {
        let { id, value } = e.target
        this.setState({
            [id]: value
        })
    }

    render() {
        return (
            <div>
                <input id="itemName" onChange={this.updateState} placeholder="Name" value={this.state.itemName}/>
                <input id="itemQuantity" placeholder="Quantity" type="number" onChange={this.updateState} value={this.state.itemQuantity}/>
                <select id="category" onChange={this.updateState} value={this.state.category}>
                    <option value="camp">Camp</option>
                    <option value="electronics">Electronics</option>
                    <option value="sports">Sport</option>
                    <option value="misc">Misc</option>
                </select>
                <button onClick={this.addNewItem}>add item!</button>
            </div>
        )
    }
}

export default AddIntialForm