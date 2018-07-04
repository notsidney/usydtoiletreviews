import React, { PureComponent } from 'react';
import logo from './logo.svg';
import './App.css';
import ReviewTable from './ReviewTable';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {searchTerm: ''};
  }
  
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <div className="logo-container">
            <img src={logo} className="logo" alt="USYD Toilet Reviews logo" />
          </div>
          <input
            type="text"
            className="search-box"
            placeholder="Find a toilet"
            onChange={e => this.setState({searchTerm: e.target.value})}
          />
        </header>
        <ReviewTable searchTerm={this.state.searchTerm} />
      </div>
    );
  }
}

export default App;
