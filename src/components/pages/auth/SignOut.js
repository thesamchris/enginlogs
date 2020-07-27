import React from 'react'
 
import { withFirebase } from '../../Firebase'
 
const SignOutButton = ({ firebase, children }) => (
  <button type="button" className="dashboard__link" onClick={firebase.doSignOut}>
    { children }
  </button>
)
 
export default withFirebase(SignOutButton)