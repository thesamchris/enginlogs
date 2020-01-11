import React from 'react'

const Messages = ({ message, showMessage }) => {
    let MessageElement = <div>{message}</div>
    return (
        <div>
            { showMessage ? MessageElement : '' }
        </div>
    )
}

export default Messages