import React from 'react'
import BottomBar from '../../skeleton/bottomBar'
import Steps from './steps'

const DetailsPage = () => (
    <div className="items_page__container user__container">
        <div className="user__logo"></div>
        <Steps />
        <BottomBar />
    </div>
)

export default DetailsPage