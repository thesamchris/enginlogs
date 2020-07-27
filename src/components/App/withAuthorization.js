import React from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'

const withAuthorization = (condition, route = ROUTES.SIGN_IN) => (
	Component
) => {
	class WithAuthorization extends React.Component {
		componentDidMount() {
			this.listener = this.props.firebase.auth.onAuthStateChanged(
				(authUser) => {
					if (!condition(authUser)) {
						this.props.history.push(route)
					}
				}
			)
		}

		componentWillUnmount() {
			this.listener()
		}

		render() {
			return <Component {...this.props} />
		}
	}

	return compose(withRouter, withFirebase)(WithAuthorization)
}

export default withAuthorization
