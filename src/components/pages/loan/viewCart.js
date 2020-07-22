import React from 'react'
import './loan.css'

class ViewCart extends React.Component {
    constructor() {
        super() 
        this.state = {
            isOpen: false
        }
    }

    toggleCart() {
        let { isOpen } = this.state
        this.setState({
            isOpen: !isOpen
        })
    }

    render() {
        let { isOpen } = this.state
        let { selectedItems, items } = this.props
        let cartItems = Object.keys(selectedItems).map(itemId => {
            let item = items[itemId]
            return <li key={itemId}>{ item.name }</li>
        })
        return (
            <div className="view_cart__container">
                <div className={`cart_container ${isOpen ? 'cart_open' : ''}`}>
                    <ul className="cart">
                        { Object.keys(selectedItems).length ? cartItems : 'Cart Is Empty' }
                    </ul>
                </div>
                <button className="view_cart__button" onClick={() => this.toggleCart()}>{ !isOpen ? 'View Cart' : 'Close Cart' }<div className="view_cart__icon"></div></button>
            </div>
        ) 
    }
}

export default ViewCart