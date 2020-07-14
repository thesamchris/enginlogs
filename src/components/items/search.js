import React from 'react'
import './search.css'

class Search extends React.Component {
    constructor() {
        super() 

        this.state = {
            search: ''
        }
    }
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }
    render() {
        const { search } = this.state
        const { items } = this.props
        let relevantItems = []
        Object.keys(items).map(key => {
            let item = items[key]
            if (search && (item.name.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase())))
                relevantItems.push(item)
        })


        let searchResults = relevantItems.map((item, key) => <li key={key}>{item.name}</li>)

        return  (
            <div>
                <input
                name="search"
                value={search}
                onChange={this.onChange}
                type="text"
                placeholder="Search for item ..."
                className="search_input"
                />

                { searchResults }
            </div>
        )
    }
}

export default Search