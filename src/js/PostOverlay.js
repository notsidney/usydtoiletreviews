import React, { Component } from 'react';
import FacebookProvider, { EmbeddedPost } from 'react-facebook';
import '../css/PostOverlay.css';

const PostOverlay = props => (
  <div id="fb-post-overlay">
    <button
      type="button"
      className="close-overlay"
      onClick={() => props.hidePost()}
    />
    <FacebookProvider appId={process.env.REACT_APP_FB_APP_ID}>
      <EmbeddedPost href={props.url} width="350" />
    </FacebookProvider>
  </div>
);

export default PostOverlay;
