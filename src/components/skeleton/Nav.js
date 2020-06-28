import React from 'react'
import { Link } from 'react-router-dom'
import { SIGN_IN, SIGN_UP, HOME, ACCOUNT, ADMIN } from '../../constants/routes'
import SignOutButton from '../pages/auth/SignOut'


const Nav = ({ authUser }) => (
	<nav>
		{ authUser ? <NavAuth /> : <NavNonAuth /> }
	</nav>
)

const NavAuth = () => (
	<div>
		<Link to={HOME}>Home</Link>
		<Link to={ACCOUNT}>Account</Link>
		<Link to={ADMIN}>Admin</Link>
		<SignOutButton />
	</div>
)

const NavNonAuth = () => (
	<div>
		<Link to={SIGN_IN}>Sign In</Link>
		<Link to={SIGN_UP}>Sign Up</Link>
	</div>
)

export default Nav
