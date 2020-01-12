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
        this.clearForm = this.clearForm.bind(this)
    }

    addNewItem(e) {
        e.preventDefault()
        let newItemRef = this.props.initialRef.push()
        let newItem = {
            name: this.state.itemName,
            quantity: this.state.itemQuantity,
            category: this.state.category
        }

        newItemRef.set({...newItem}, error => {
            if (error) {
                this.props.setMessage(error)
            } else {
                this.props.setMessage('Item added successfully!')
            }

            return this.clearForm()
        })
    }

    clearForm() {
        this.setState({
            itemName: '',
            itemQuantity: '',
            category: 'camp'
        })
    }

    updateState(e) {
        let { id, value } = e.target
        this.setState({
            [id]: value
        })
    }

    render() {
        let { itemName, itemQuantity, category } = this.state
        let canSubmit = itemName && itemQuantity && category
        return (
            <div className="page page--centered">
                <h1>Add Item</h1>
                <div className="input__container">
                    <label className="input__label" htmlFor="itemName">Item Name</label>
                    <input id="itemName" onChange={this.updateState} placeholder="Name" value={this.state.itemName}/>
                </div>
                <div className="input__container">
                    <label className="input__label" htmlFor="itemQuantity">Item Quantity</label>
                    <input id="itemQuantity" placeholder="Quantity" type="number" onChange={this.updateState} value={this.state.itemQuantity}/>
                </div>
                <div className="input__container">
                    <label className="input__label" htmlFor="category">Category</label>
                    <select id="category" onChange={this.updateState} value={this.state.category}>
                        <option value="camp">Camp</option>
                        <option value="electronics">Electronics</option>
                        <option value="sports">Sport</option>
                        <option value="misc">Misc</option>
                    </select>
                </div>
                <div className="input__container">
                    <button disabled={!canSubmit} className="button" onClick={this.addNewItem}>add item</button>
                </div>
            </div>
        )
    }
}

export default AddIntialForm