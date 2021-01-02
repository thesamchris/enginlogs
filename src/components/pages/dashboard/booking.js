import React from 'react'
import './dashboard.css'

class Booking extends React.Component {
    constructor() {
        super()

        this.state = {
            open: false
        }
    }

    render() {
        let { id, date, itemNames, status } = this.props
        return (
            <div className="dashboard__booking">
                <div className="dashboard__booking--group">
                    <div className="dashboard__booking--group-title">
                        <strong>ID</strong>
                    </div>
                    <div className="dashboard__booking--group-text id">{ id }</div>
                </div>
                <div className="dashboard__booking--group">
                    <div className="dashboard__booking--group-title">
                        <strong>STATUS</strong>
                    </div>
                    <div className="dashboard__booking--group-text">{ status }</div>
                </div>
                <div className="dashboard__booking--group">
                    <div onClick={ () => this.setState({open: !this.state.open})} className="dashboard__booking--group-title">
                        <strong className="flex">ITEMS <div className={`booking__arrow ${this.state.open ? '' : 'flip'}`}>^</div></strong>
                    </div>
                    <ul className="dashboard__booking--group-text" hidden={!this.state.open}>{ itemNames }</ul>
                </div>
                <div className="dashboard__booking--group">
                    <div className="dashboard__booking--group-title">
                        <strong>RETURN BY</strong>
                    </div>
                    <div className="dashboard__booking--group-text">{ (new Date(date)).toDateString() }</div>
                </div>
            </div>
        )

    }
}

export default Booking