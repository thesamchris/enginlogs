import React from 'react'
import { Link } from 'react-router-dom'
import { SIGN_UP} from '../../../constants/routes'
import { FirebaseContext } from '../../Firebase'

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
		<FirebaseContext.Consumer>
			{(firebase) => <SignUpForm firebase={firebase}/>}
		</FirebaseContext.Consumer>
	</div>
)

class SignUpForm extends React.Component {
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

export default SignUp
export { SignUpForm, SignUpLink }
