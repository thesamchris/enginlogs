import React from 'react'
// import './App.css'
import AddInitial from '../addInitial'
import ShowItems from '../showItems'

function App() {
  return (
    <div className="App">
      <AddInitial />
      <div>for add initial item, add functionality to add category</div>
      <div>add booking</div>
      <div>show items (add functionality to show amount based on date selected, filterbased on category as well please)</div>
      <ShowItems />
      <div>show bookings</div>
    </div>
  );
}

export default App;
