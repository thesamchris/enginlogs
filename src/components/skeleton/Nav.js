import React from 'react'
import { Link } from 'react-router-dom'
import { SIGN_IN, SIGN_UP, HOME, ACCOUNT, ADMIN } from '../../constants/routes'

const Nav = () => (
	<nav>
		<Link to={SIGN_IN}>Sign In</Link>
		<Link to={SIGN_UP}>Sign Up</Link>
		<Link to={HOME}>Home</Link>
		<Link to={ACCOUNT}>Account</Link>
		<Link to={ADMIN}>Admin</Link>
	</nav>
)

export default Nav
