import React from 'react'
import { NavLink } from 'react-router-dom'
import './bottomBar.css'

const BottomBar = () => (
	<div className="bar__container">
		<div className="bar__sections_container">
			<NavLink activeClassName="active" to="/items" className="bar__section">
				<div className="bar__section_image bar__items"></div>
				<div className="bar__section_name">items</div>
				<div className="bar__marker"></div>
			</NavLink>
			<NavLink
				activeClassName="active"
				to="/dashboard"
				className="bar__section"
			>
				<div className="bar__section_image bar__dashboard"></div>
				<div className="bar__section_name">dashboard</div>
				<div className="bar__marker"></div>
			</NavLink>
			<NavLink activeClassName="active" to="/loan" className="bar__section">
				<div className="bar__section_image bar__loan"></div>
				<div className="bar__section_name">loan</div>
				<div className="bar__marker"></div>
			</NavLink>
		</div>
	</div>
)

export default BottomBar