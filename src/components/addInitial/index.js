import React from 'react'
import { FirebaseContext } from '../Firebase'
import AddIntialForm from './form'



const AddInitialContainer = () => (
    <FirebaseContext.Consumer>
        {
            firebase => {
                return <AddIntialForm initialRef={firebase.db.ref('initial')}/>
            }
        }
    </FirebaseContext.Consumer>
)

export default AddInitialContainer