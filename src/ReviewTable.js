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
          searchTerm: '',
        });
      })
      .catch(error => alert(`Error loading data:\n${error}`));
  }

  search(term) {
    const termLow = term.toLowerCase();
    const displayOrder = this.state.displayOrder.filter(
      id => this.state.posts[id].building.toLowerCase().indexOf(termLow) !== -1
    );
    return displayOrder;
  }

  sortTable(cat, reversed = false) {
    const sortedKeys = Object.keys(this.state.posts).sort((a, b) => {
      // Deal with blank strings
      if (this.state.posts[a][cat] === '') return 1;
      if (this.state.posts[b][cat] === '') return -1;
      // Normal sorting
      if (this.state.posts[a][cat] < this.state.posts[b][cat]) return -1;
      if (this.state.posts[a][cat] > this.state.posts[b][cat]) return 1;
      return 0;
    });

    if (reversed) sortedKeys.reverse();
    this.setState({ displayOrder: sortedKeys });
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
    // Change source of displayOrder array
    let displayOrder;
    if (this.state.searchTerm !== '') {
      displayOrder = this.search(this.state.searchTerm);
    } else {
      displayOrder = this.state.displayOrder;
    }
    // Otherwise, based on order of IDs in displayOrder in state
    const tableRows = displayOrder.map((id) => {
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
      <React.Fragment>
        <input
          type="text"
          className="search-box"
          placeholder="Find a toilet…"
          onChange={e => this.setState({searchTerm: e.target.value})}
        />

        <div className="table-container">

          <table>
            <colgroup>
              <col className="col-actions" />
              <col className="col-building" />
              <col className="col-level" />
              <col className="col-type" />
              <col className="col-rating" />
              <col className="col-timestamp" />
              <col className="col-notes" />
            </colgroup>

            <thead>
              <tr>
                <th>Actions</th>
                <th
                  className="sortable"
                  onClick={e => this.sortTable('building')}
                >
                  Building
                </th>
                <th
                  className="sortable"
                  onClick={e => this.sortTable('level')}
                >
                  Level
                </th>
                <th
                  className="sortable"
                  onClick={e => this.sortTable('type')}
                >
                  Type
                </th>
                <th
                  className="sortable"
                  onClick={e => this.sortTable('rating')}
                >
                  Rating
                </th>
                <th
                  className="sortable"
                  onClick={e => this.sortTable('timestamp')}
                >
                  Timestamp
                </th>
                <th
                  className="sortable"
                  onClick={e => this.sortTable('notes')}
                >
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {tableRows}
            </tbody>
          </table>

        </div>
      </React.Fragment>
    );
  }
}

export default ReviewTable;
