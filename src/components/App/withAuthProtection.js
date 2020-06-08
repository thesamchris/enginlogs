import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'

const withAuthProtection = redirectPath => WrappedComponent => {
    class withAuthProtection extends Component {
        componentDidMount() {
            const { history } = this.props
            if (!firebase.auth().currentUser) {
                return history.push(redirectPath)
            }
        }

        componentWillReceiveProps(nextProps) {
            const { user, history } = this.props
            const { user: nextUser } = nextProps
            if (user && !nextUser) {
                history.push(redirectPath)
            }
        }

        render() {
            const { user } = this.props
            if (!user)
                return null
            return <WrappedComponent {...this.props} />
        }
    }

    return withAuthProtection
}

export default withAuthProtection