import React from 'react'
import BottomBar from '../../skeleton/bottomBar'
import Search from '../../items/search'
import withAuthorization from '../../App/withAuthorization'
import './items.css'

class ItemsPage extends React.Component {
	constructor() {
		super()

		this.state = {
			search: '',
		}
	}

	onChange = (event) => {
		return this.setState({ [event.target.name]: event.target.value })
    }

    sports = () => {
        return this.setState({
            search: 'Sports'
        })
    }

    electronics = () => {
        return this.setState({
            search: 'Electronics'
        })
    }

    misc = () => {
        return this.setState({
            search: 'Misc'
        })
    }

    camp = () => {
        return this.setState({
            search: 'Camp'
        })
    }
    
	render() {
		let { items } = this.props
		return (
			<div className="items_page__container user__container">
				<div className="user__logo"></div>
				<div className="tagline">what are you looking for?</div>
				<div className="items_page__content">
					<Search items={items} onChange={this.onChange} search={this.state.search}/>
					<section>
						<span className="items_page__title">categories</span>
						<div className="items_page__carteory_cards_container">
							<button onClick={() => this.sports()} className="items_page__category_card">
								<strong>sports</strong>
								<div className="grow"></div>
								<div className="category_card__image sports"></div>
							</button>
							<button onClick={() => this.electronics()}
								to="/items/electronics"
								className="items_page__category_card"
							>
								<strong>electronics</strong>
								<div className="grow"></div>
								<div className="category_card__image electronics"></div>
							</button>
							<button onClick={() => this.camp()} to="/items/camp" className="items_page__category_card">
								<strong>camp</strong>
								<div className="grow"></div>
								<div className="category_card__image camp"></div>
							</button>
							<button onClick={() => this.misc()} to="/items/misc" className="items_page__category_card">
								<strong>misc</strong>
								<div className="grow"></div>
								<div className="category_card__image misc"></div>
							</button>
						</div>
					</section>
				</div>
				<BottomBar />
			</div>
		)
	}
}

const condition = (authUser) => !!authUser

export default withAuthorization(condition)(ItemsPage)