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
        <iframe
          frameBorder="0"
          className="map"
          title="map"
          src="https://www.google.com/maps/embed/v1/view?key=AIzaSyDzdGLNdGdr8kipk4O4p-5OEP_EB2pyCPQ&center=-33.888584,151.187347&zoom=16"
        />

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

        <div className="app-footer-container">
          <footer className="app-footer">
            <img src={logo} className="footer-logo" alt="USYD Toilet Reviews logo" />
            <a
              className="footer-like"
              href="https://www.facebook.com/221844801737554"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="fb" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58">
                <path d="M54.8,0H3.2A3.2,3.2,0,0,0,0,3.2V54.8A3.2,3.2,0,0,0,3.2,58H31V35.57H23.45V26.79H31V20.33c0-7.49,4.58-11.57,11.26-11.57A64.2,64.2,0,0,1,49,9.1v7.83h-4.6c-3.64,0-4.35,1.72-4.35,4.26v5.59h8.7l-1.13,8.78H40V58H54.8A3.2,3.2,0,0,0,58,54.8V3.2A3.2,3.2,0,0,0,54.8,0Z"/>
              </svg>&nbsp;
              Like us on Facebook
            </a>
            <div className="footer-disclaimer">
              USYD Toilet Reviews is not affiliated with, sponsored, or endorsed
              by the University of Sydney.
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
