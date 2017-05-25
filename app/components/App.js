'use strict'

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Login from './Login'
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore'
import { isEqual } from 'underscore'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = AppStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AppStore.listen(this.onChange);
    AppActions.getSession();
    $.material.init();
  }

  componentWillUnmount() {
    AppStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  componetDidUpdate() {
    $.material.init();
  }

  render() {
    console.log('app props: ', this.props);
    let user = this.state.user
    let children = this.props.children
    function content() {
      if (user) {
        return (
          children
        )
      } else {
        return (
          <Login />
        )
      }
    }
    return (
      <div id='app-container'>
        <div id='wrap'>
          <Navbar user={this.state.user} />
          {content()}
        </div>
        <Footer />
      </div>
    );
  }
}
