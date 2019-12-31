import React, { Component } from 'react'
import { withFirebase } from '../Firebase/context'
import SelectItem from './selectItem'

class SelectItems extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            items: {}
        }
    }

    componentDidMount() {
        this.setState({
            loading: true
        })
        this.props.firebase.initial().on('value', snap => {
            this.setState({
                items: snap.val(),
                loading: false
            })
        })
    }

    render() {
        let { loading, items } = this.state
        let itemElements
        if (items) {
            itemElements = Object.keys(items).map(key => <SelectItem key={key} id={key} itemData={items[key]} selectItem={this.props.selectItem}/>)
        }
        return (
            <div>
                Select Items
                { loading ? 'loading' : ''}
                { items ? itemElements : '' }
            </div>
        )
    }
}

export default withFirebase(SelectItems)