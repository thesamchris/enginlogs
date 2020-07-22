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
        const { items, mode } = this.props
        let relevantItems = []
        Object.keys(items).map(key => {
            let item = items[key]
            if (search && (item.name.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase())))
                relevantItems.push(item)
        })


        let searchResults = relevantItems.map((item, key) => <li key={key}>{item.name}</li>)

        let loanSearchResults = relevantItems.map((item, key) => {
            let isInCart = false
            return (
                <button className="items_page__category_card">
                    <strong>{ item.name }</strong>
                    <div className="grow"></div>
                    <div className={`category_card__image ${isInCart ? 'remove' : 'add'}`}></div>
                </button>
            )
        })

        return  (
            <div>
                { mode =='loan' ? (
                    <div>
                        <input
                        name="search"
                        value={search}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Search for item ..."
                        className="search_input"
                        />

                        { loanSearchResults }
                    </div>
                ) : (
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
                )}
                
            </div>
        )
    }
}

export default Search