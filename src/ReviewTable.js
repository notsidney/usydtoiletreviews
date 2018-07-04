import React, { Component } from 'react';
import axios from 'axios';
import './ReviewTable.css';

class ReviewTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      downloadProgress: 0,
      downloading: true,
      data: null,
    }
  }

  componentDidMount() {
    // axios.get('https://usydtoiletreviews-api.herokuapp.com/', {
    axios.get('posts.json', {
      // Send progress to App state
      onDownloadProgress: (progressEvent) => {
        let progress = Math.floor(
          progressEvent.loaded / progressEvent.total * 100);
        this.setState({downloadProgress: progress});
      }
    })
      .then((response) => {
        // Cache to localStorage
        // localStorage.setItem('data', JSON.stringify(response.data));
        // Add to App state
        this.setState({
          downloading: false,
          data: response.data
        });
      })
      .catch(error => alert(`Error loading data:\n${error}`));
  }

  render() {
    const tableRows = this.state.downloading
      ? (
        <tr>
          <td>
            Loading…
          </td>
        </tr>
      )
      : this.state.data.posts.map(item => (
        <tr key={item.id}>
          <td>
            <a
              href={`https://www.facebook.com/${this.state.data.page_id}/posts/${item.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Link
            </a>
          </td>
          <td>{item.building}</td>
          <td>{item.level}</td>
          <td>{item.type}</td>
          <td>{item.rating}</td>
          <td>{item.timestamp}</td>
          <td>{item.notes}</td>
        </tr>
      ));

    return (
      <table>
        <thead>
          <tr>
            <th>Actions</th>
            <th>Building</th>
            <th>Level</th>
            <th>Type</th>
            <th>Rating</th>
            <th>Date posted</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    );
  }
}

export default ReviewTable;
