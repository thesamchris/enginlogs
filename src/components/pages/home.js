import React from 'react'
import { Link } from 'react-router-dom'
import withAuthorization from '../App/withAuthorization'
import './home.css'
const HomePage = () => (
    <div className="mobile__bg">
        <div className="mobile__content spaced__content">
            <div className="logo__white home__logo"></div>
            <div className="home__tagline">loaning made simple</div>
            <Link to="/signin" className="home__button">sign in</Link>
            <Link to="/signup" className="home__account">or create an account</Link>
        </div> 
    </div>
)

const condition = (authUser) => !authUser

export default withAuthorization(condition, '/dashboard')(HomePage)