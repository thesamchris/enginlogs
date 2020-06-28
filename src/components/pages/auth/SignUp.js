import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import { SIGN_UP, DASHBOARD } from '../../../constants/routes'
import { withFirebase } from '../../Firebase'

const INITIAL_STATE = {
	firstName: '',
	email: '',
	passwordOne: '',
	passwordTwo: '',
	error: null,
}

const SignUp = () => (
	<div>
		Sign Up here!
		<SignUpForm />
	</div>
)

class SignUpFormBase extends React.Component {
    constructor(props) {
        super(props)

        this.state = { ...INITIAL_STATE }
    }

    onSubmit = (event) => {
        const { firstName, email, passwordOne } = this.state

				this.props.firebase
					.doCreateUserWithEmailAndPassword(email, passwordOne)
					.then((authUser) => {
						this.setState({ ...INITIAL_STATE })
                        this.props.history.push(DASHBOARD)
					})
					.catch((error) => {
						this.setState({ error })
					})

				event.preventDefault()
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        let { firstName, email, passwordOne, passwordTwo, error } = this.state

        const isInvalid =
					passwordOne !== passwordTwo ||
					passwordOne === '' ||
					email === '' ||
					firstName === ''

        return (
            <form onSubmit={this.onSubmit}>
                { error && <p>{error.message}</p> }
                <input type="text" name="firstName" value={firstName} onChange={this.onChange} placeholder="First Name"/>
                <input type="email" name="email" value={email} onChange={this.onChange} placeholder="Email"/>
                <input type="password" name="passwordOne" value={passwordOne} onChange={this.onChange} placeholder="Password"/>
                <input type="password" name="passwordTwo" value={passwordTwo} onChange={this.onChange} placeholder="Confirm Password"/>

                <button disabled={isInvalid} type="submit">Sign Up</button>
            </form>
        )
    }
}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={SIGN_UP}>Sign Up</Link>
    </p>
)

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase)

export default SignUp
export { SignUpForm, SignUpLink }
