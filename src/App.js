import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReviewTable from './ReviewTable';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <ReviewTable />
      </div>
    );
  }
}

export default App;
