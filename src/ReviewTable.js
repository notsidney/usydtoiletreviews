import React, { Component } from 'react';
import axios from 'axios';
import './ReviewTable.css';
import ReviewTableSortableHeader from './ReviewTableSortableHeader';

class ReviewTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      downloading: true,
      page_id: null,
      posts: {},
      displayOrder: [],
      originalOrder: [],
      sortedBy: 'timestamp',
    };

    this.sortTable = this.sortTable.bind(this);
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
    this.setState({
      displayOrder: sortedKeys,
      sortedBy: cat,
    });
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
    if (this.props.searchTerm !== '') {
      displayOrder = this.search(this.props.searchTerm);
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
            <svg className="fb" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58">
              <path class="cls-1" d="M54.8,0H3.2A3.2,3.2,0,0,0,0,3.2V54.8A3.2,3.2,0,0,0,3.2,58H31V35.57H23.45V26.79H31V20.33c0-7.49,4.58-11.57,11.26-11.57A64.2,64.2,0,0,1,49,9.1v7.83h-4.6c-3.64,0-4.35,1.72-4.35,4.26v5.59h8.7l-1.13,8.78H40V58H54.8A3.2,3.2,0,0,0,58,54.8V3.2A3.2,3.2,0,0,0,54.8,0Z"/>
            </svg>
            </a>

            <svg className="place" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </td>
          <td>{item.building}</td>
          <td>{item.level}</td>
          <td>{item.type.substr(0, 6)}</td>
          <td>{item.rating}</td>
          <td>{item.timestamp}</td>
          <td>{item.notes.replace(/(\[|\]|\(|\))/g, '')}</td>
        </tr>
      ) : null;

      return tableRow;
    });

    return (
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
              <ReviewTableSortableHeader
                title="Building"
                clickHandler={this.sortTable}
                sortedBy={this.state.sortedBy}
              />
              <ReviewTableSortableHeader
                title="Level"
                clickHandler={this.sortTable}
                sortedBy={this.state.sortedBy}
              />
              <ReviewTableSortableHeader
                title="Type"
                clickHandler={this.sortTable}
                sortedBy={this.state.sortedBy}
              />
              <ReviewTableSortableHeader
                title="Rating"
                clickHandler={this.sortTable}
                sortedBy={this.state.sortedBy}
              />
              <ReviewTableSortableHeader
                title="Timestamp"
                clickHandler={this.sortTable}
                sortedBy={this.state.sortedBy}
              />
              <ReviewTableSortableHeader
                title="Notes"
                clickHandler={this.sortTable}
                sortedBy={this.state.sortedBy}
              />
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ReviewTable;
