import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import AddInitial from '../addInitial';

function App() {
  return (
    <div className="App">
      <AddInitial />
      <div>show items</div>
      <div>show bookings</div>
    </div>
  );
}

export default App;
