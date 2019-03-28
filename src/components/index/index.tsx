import React, { Component } from 'react'
import * as s from './index.less';
import Top from "../header";


export default class Index extends Component {
  render() {
    return (
        <div className={s.page}>
          <Top></Top>
          <div></div>
        </div>
    )
  }
}
