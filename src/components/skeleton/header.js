import React from 'react'
import './header.css'
import { Link } from  'react-router-dom'

const Header = () => (
    <header className="header">
        <Link className="header__logo" to="/"/>
    </header>
)

export default Header