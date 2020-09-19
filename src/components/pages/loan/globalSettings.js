import React from 'react'

class GlobalSettings extends React.Component {
    constructor() {
        super()
        this.state = {
            collectionTimeStart: "1200",
            collectionTimeEnd: "1345",
            returnTimeStart: "1200",
            returnTimeEnd: "1345",
            collectionTimeSameAsReturnTime: true
        }
    }
    render() {
        const { updateCollectionAndReturnTimings } = this.props
        const { collectionTimeStart, collectionTimeEnd, returnTimeStart, returnTimeEnd, collectionTimeSameAsReturnTime } = this.state
        return (
            <div>
                hello i am supposed to allow my admin users to be able to change the timings.
                <button onClick={() => updateCollectionAndReturnTimings(collectionTimeStart, collectionTimeEnd, returnTimeStart, returnTimeEnd, collectionTimeSameAsReturnTime)}>Update Collection and Return Timings</button>
            </div>
        )
    }
}

export default GlobalSettings