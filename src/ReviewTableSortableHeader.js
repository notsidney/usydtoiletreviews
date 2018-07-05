import React, { PureComponent } from 'react';
import './ReviewTableSortableHeader.css';

class ReviewTableSortableHeader extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { reverse: false };
  }

  render() {
    return (
      <th
        className={`sortable${this.state.reverse ? '' : ' reversed'}`}
        onClick={() => {
          this.props.clickHandler(
            this.props.title.toLowerCase(), this.state.reverse,
          );
          this.setState(prevState => ({ reverse: !(prevState.reverse) }));
        }}
      >
        {this.props.title}
        {this.props.sortedBy === this.props.title.toLowerCase() ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        ) : null
        }
      </th>
    );
  }
}

export default ReviewTableSortableHeader;
