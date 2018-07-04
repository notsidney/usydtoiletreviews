import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReviewTable from './ReviewTable';

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    </header>
    <ReviewTable />
  </div>
);

export default App;
