import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route } from 'react-router-dom';
import { createHashHistory as history } from 'history'
import blogList from './components/blogList';
import classification from './components/class';
import about from './components/about';
import Index from './components/index';
import './assets/css/global.css';
import { Layout } from 'antd';
const {
  Header, Footer
} = Layout

ReactDOM.render(
  <div>
    <Layout>
      <Header>
        <Index></Index>
      </Header>
    </Layout>
    <Layout>
      <Router history={history()}>
        <Route exact path='/'  component={blogList}></Route>
        <Route exact path='/blogDetail' component={blogList}></Route>
        <Route exact path='/classification' component={classification}></Route>
        <Route exact path='/about' component={about}></Route>
      </Router>
    </Layout>
    <Footer></Footer>
  </div>,
  document.getElementById('app')
);
