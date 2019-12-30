import React from 'react'

class AddIntialForm extends React.Component {
    constructor() {
        super()
        this.addNewItem = this.addNewItem.bind(this)
    }

    addNewItem(e, arg) {
        e.preventDefault()
        let newItemRef = this.props.initialRef.push()
        let newItem = {
            name: 'Blue Plastic Balls',
            quantity: 68
        }
       newItemRef.set(...newItem)
    }

    render() {
        console.log(this)
        return (
            <div>
                <input placeholder="Name" />
                <input placeholder="Quantity" />
                <button onClick={this.addNewItem}>add item!</button>
            </div>
        )
    }
}

export default AddIntialForm