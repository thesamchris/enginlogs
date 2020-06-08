import React, { Component } from 'react'
import firebase from 'firebase'

class HomePage extends Component {
    constructor() {
        super()
        this.signIn = this.signIn.bind(this)
        this.provider = new firebase.auth.GoogleAuthProvider()
    }

    componentDidMount() {
        firebase.auth().languageCode = 'en'
        
    }

    signIn() {
        console.log('sign in with google')
        firebase.auth().signInWithRedirect(this.provider)
        window.location = '/dashboard'
    }

    render() {
        return (
					<button className="app__homeButton" onClick={this.signIn}>
						Sign In With Google
					</button>
				)
    }
}

export default HomePage