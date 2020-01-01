import app from 'firebase/app'
import 'firebase/database' 

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
}

class Firebase {
    constructor() {
        app.initializeApp(config)
        this.db = app.database()
    }

    initial = () => this.db.ref('initial')

    loaners = () => this.db.ref('loaners')

    loaner = (telegramHandle) => this.db.ref('loaners').child(telegramHandle)

    bookItem = (uid, day) => this.db.ref('initial').child(uid).child('bookings').child(day)

    bookings = () => this.db.ref('bookings')

    particularBooking = (uid) => this.db.ref('bookings').child(uid) 
}

export default Firebase
