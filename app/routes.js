'use strict'

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';
import Signin from './components/Signup';
import NotFoundPage from './components/404';
import ProfilePage from './components/ProfilePage';
import Article from './components/Article'

const routes = (
    <Route component={Layout}>
      <Route path='/' component={Home} />
      <Route path='login' component={Login} />
      <Route path='signup' component={Signin} />
      <Route path='user/:user' component={ProfilePage}/>
      <Route path='u/:user/:time/:title' component={Article}/>
      <Route path='*' component={NotFoundPage} />
    </Route>
);

export default routes;
