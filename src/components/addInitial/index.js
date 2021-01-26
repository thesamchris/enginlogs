import React from 'react'
import { FirebaseContext } from '../Firebase'
import AddIntialForm from './form'
import withAuthorization from '../App/withAuthorization'



const AddInitialContainer = ({ setMessage }) => (
    <FirebaseContext.Consumer>
        {
            firebase => {
                return <AddIntialForm setMessage={setMessage} initialRef={firebase.db.ref('initial')}/>
            }
        }
    </FirebaseContext.Consumer>
)

const condition = (authUser) => (authUser.email === 'logistics@enginclub.com' || authUser.email === 'hellosamchris@gmail.com' || authUser.email === 'elogs@gmail.com')

export default withAuthorization(condition, '/dashboard')(AddInitialContainer)