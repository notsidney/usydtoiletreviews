import React from 'react';
import '../css/ReviewTableRow.css';

const ReviewTableRow = props => (
  <tr>
    <td>
      <a
        href={`https://www.facebook.com/${props.page_id}/posts/${props.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg className="fb" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58">
          <path d="M54.8,0H3.2A3.2,3.2,0,0,0,0,3.2V54.8A3.2,3.2,0,0,0,3.2,58H31V35.57H23.45V26.79H31V20.33c0-7.49,4.58-11.57,11.26-11.57A64.2,64.2,0,0,1,49,9.1v7.83h-4.6c-3.64,0-4.35,1.72-4.35,4.26v5.59h8.7l-1.13,8.78H40V58H54.8A3.2,3.2,0,0,0,58,54.8V3.2A3.2,3.2,0,0,0,54.8,0Z" />
        </svg>
      </a>

      <svg
        className="place"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        onClick={() => props.moveMap(props.building)}
      >
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    </td>
    <td>{props.building}</td>
    <td>{props.level}</td>
    <td>{props.type.substr(0, 6)}</td>
    <td>{props.rating}</td>
    <td>{props.timestamp}</td>
    <td>{props.notes.replace(/(\[|\]|\(|\))/g, '')}</td>
  </tr>
);

export default ReviewTableRow;
