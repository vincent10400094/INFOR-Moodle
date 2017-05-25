'use strict'

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Login from './components/Login';
import Signin from './components/Signup';
import NotFoundPage from './components/404';
import ProfilePage from './components/ProfilePage';
import Article from './components/Article';
import history from './components/history';
import Search from './components/Search';
import TagPage from './components/TagPage';
import EditPost from './components/EditPost'

const routes = (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='login' component={Login} />
    <Route path='signup' component={Signin} />
    <Route path='history' component={history} />
    <Route path='search' component={Search} />
    <Route path='tags/:tag' component={TagPage} />
    <Route path='user/:user' component={ProfilePage} />
    <Route path='u/:user/:time/:title' component={Article} />
    <Route path='u/:user/:time/:title/edit' component={EditPost} />
    <Route path='remove/:user/:time/:title' component={Article} />
    <Route path='*' component={NotFoundPage} />
  </Route>
);

export default routes;
