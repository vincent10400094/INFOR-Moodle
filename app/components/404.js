'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class NotFoundPage extends React.Component {
  render() {
    const divStyle = {
      paddingTop: '20%'
    }
    return (
      <div className="col-md-8 col-md-offset-2" style={divStyle}>
        <h1>404 Not found</h1>
        <h3>The page You're looking for does not exist or has been removed</h3>
      </div>
    );
  }
}
