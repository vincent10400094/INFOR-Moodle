'use strict'

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default class Layout extends React.Component {
  render() {
    return (
      <div id='app-container'>
        <div id='wrap'>
            <Navbar />
            {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}
