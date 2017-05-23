'use strict'

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = AppStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AppStore.listen(this.onChange);
    AppActions.getSession();
  }

  componentWillUnmount() {
    AppStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div id='app-container'>
        <div id='wrap'>
          <Navbar user={this.state.user}/>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}
