import React, { Component } from "react"
import View from './view'
import Loan from './loan'
import { withFirebase } from '../Firebase/context'

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      items: {}
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.initial().on("value", snap => {
      this.setState({
        loading: false,
        items: snap.val()
      });
    });
  }

  render() {
    let { selectable, selectItem } = this.props
    let { loading, items } = this.state
    let toDisplay
    if (!items) {
        toDisplay = 'no items'
    } else if (items && !selectable) {
        toDisplay = <View items={items} />
    } else if (items && selectable) {
        toDisplay = <Loan selectItem={selectItem} items={items} />
    }

    if (items) {
      
    }
    return (
      <div>
        {loading ? "loading" : ""}
        {toDisplay}
      </div>
    );
  }
}

export default withFirebase(Display);
