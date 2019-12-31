import React, { Component } from 'react'
import { withFirebase } from '../Firebase/context'

class ShowItems extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            items: {}
        }
    }

    componentDidMount() {
        this.setState({ loading: true })

        this.props.firebase.initial().on('value', snap => {
            this.setState({
                loading: false,
                items: snap.val()
            })
        })
    }

    render() {
        let  { loading, items } = this.state
        let itemElements = {}
        if (items) {
            itemElements = Object.keys(items).map(key => {
                let item = items[key]
                return (
                    <li key={key}>{item.name}, raw quantity is {item.quantity}</li>
                )
            })
        }
        return (
            <div>
                show items
                { loading ? 'loading' : '' }
                <ul>
                    { items ? itemElements : 'no items' }
                </ul>
            </div>
        )
    }


}


export default withFirebase(ShowItems)