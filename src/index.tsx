import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route } from 'react-router-dom';
import { createHashHistory as history } from 'history'
import blogList from './components/blogList';
import test from './components/test';
import Index from './components/index';
import './assets/css/global.css';

ReactDOM.render(
  <div>
    <Index></Index>
    <Router history={history()}>
      <Route path='/' exact component={blogList}></Route>
      <Route path='/blogList' component={blogList}></Route>
      <Route path='/test' component={test}></Route>
    </Router>
  </div>,
  document.getElementById('app')
);
