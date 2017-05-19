import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Login from './components/Login';
import Signin from './components/Signup';

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/login' component={Login} />
    <Route path='/signup' component={Signin} />
  </Route>
);
