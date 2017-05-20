'use strict'

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';
import Signin from './components/Signup';
import NotFoundPage from './components/404';

const routes = (
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}/>
      <Route path=':page' component={Home}/>
      <Route path="login" component={Login} />
      <Route path="signup" component={Signin} />
      <Route path="*" component={NotFoundPage} />
    </Route>
);

export default routes;
