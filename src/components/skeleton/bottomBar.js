import React from 'react'
import { Link } from 'react-router-dom'
import './bottomBar.css'

const BottomBar = () => (
    <div className="bar__container">
        <div className="bar__sections_container">
            <Link to="/items" className="bar__section">
                <div className="bar__section_image bar__items"></div>
                <div className="bar__section_name">items</div>
            </Link>
            <Link to="/dashboard" className="bar__section">
                <div className="bar__section_image bar__dashboard"></div>
                <div className="bar__section_name">dashboard</div>
            </Link>
            <Link to="/loan" className="bar__section">
                <div className="bar__section_image bar__loan"></div>
                <div className="bar__section_name">loan</div>
            </Link>
        </div>
    </div>
)

export default BottomBar