import React, { Component } from 'react'
import * as s from './index.less';
import Top from "../header";

import { Layout } from 'antd';
const {
  Header
} = Layout

export default class Index extends Component {
  render() {
    return (
      <Layout>
        <Header>
          <Top></Top>
          <div className={s.page}></div>
        </Header>
      </Layout>
    )
  }
}
