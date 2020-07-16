import React from 'react'
import { NavLink } from 'react-router-dom'
import './steps.css'

const Steps = () => (
	<div className="steps__container">
		<div className="steps__wrapper">
			<div className="steps__icon_group">
				<NavLink
                    exact
					to="/loan"
					activeClassName="steps__active"
					className="steps__step"
				>
					<div className="steps__marker"></div>
					<div className="steps__image steps__period"></div>
					<div className="steps__text">
						loaning <br /> period
					</div>
				</NavLink>
				<NavLink
					to="/loan/items"
					activeClassName="steps__active"
					className="steps__step"
				>
					<div className="steps__marker"></div>
					<div className="steps__image steps__items"></div>
					<div className="steps__text">
						select <br /> items
					</div>
				</NavLink>
				<NavLink
					to="/loan/confirm"
					activeClassName="steps__active"
					className="steps__step"
				>
					<div className="steps__marker"></div>
					<div className="steps__image steps__confirm"></div>
					<div className="steps__text">
						confirm <br /> booking
					</div>
				</NavLink>
			</div>
		</div>

		<div className="steps__line"></div>
	</div>
)

export default Steps