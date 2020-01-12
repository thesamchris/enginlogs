import React from 'react'
import { FirebaseContext } from '../Firebase'
import AddIntialForm from './form'



const AddInitialContainer = ({ setMessage }) => (
    <FirebaseContext.Consumer>
        {
            firebase => {
                return <AddIntialForm setMessage={setMessage} initialRef={firebase.db.ref('initial')}/>
            }
        }
    </FirebaseContext.Consumer>
)

export default AddInitialContainer