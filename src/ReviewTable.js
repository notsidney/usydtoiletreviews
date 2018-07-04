import React, { Component } from 'react';
import axios from 'axios';
import './ReviewTable.css';

class ReviewTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      downloading: true,
      page_id: null,
      posts: {},
      displayOrder: [],
      originalOrder: [],
    };
  }

  componentDidMount() {
    // axios.get('https://usydtoiletreviews-api.herokuapp.com/', {
    axios.get('posts.json')
      .then((response) => {
        // Loop through each post and store it as a key-value pair
        const posts = {};
        // Store original order here
        const displayOrder = [];
        response.data.posts.forEach((item) => {
          posts[item.id] = item;
          displayOrder.push(item.id);
        });
        // Add to App state
        this.setState({
          downloading: false,
          page_id: response.data.page_id,
          posts,
          displayOrder,
          originalOrder: displayOrder,
        });
      })
      .catch(error => alert(`Error loading data:\n${error}`));
  }

  render() {
    // Render something else when downloading
    if (this.state.downloading) {
      return (
        <h1 className="loading">
          Loading…
        </h1>
      );
    }
    // Otherwise, render content
    // Renders based on order of IDs in displayOrder in state
    const tableRows = this.state.displayOrder.map((id) => {
      const item = this.state.posts[id];

      const tableRow = item !== undefined ? (
        <tr key={id}>
          <td>
            <a
              href={`https://www.facebook.com/${this.state.page_id}/posts/${item.id}`}
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
          <td>{item.notes.replace(/(\[|\]|\(|\))/g, '')}</td>
        </tr>
      ) : null;

      return tableRow;
    });

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
