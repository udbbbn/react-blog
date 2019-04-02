import React, { Component } from 'react';
import * as s from './index.less';
import { Row, Col, Tag } from 'antd';


export default class classification extends Component {

  scrollToItem = (domId: string) => {
    if (domId) {
      let dom = document.getElementById(domId);
      if (dom) {
        dom.scrollIntoView();
      }
    }
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={2} sm={2} md={4} lg={4} xl={4}></Col>
          <Col xs={22} sm={22} md={16} lg={8} xl={10}>
            <section className={s.wrapper}>
            <div className={s.classWrapper}>
              <Tag><a onClick={()=>{this.scrollToItem('js')}} className={s.tag}>js</a></Tag>
              <Tag><a onClick={()=>{this.scrollToItem('python')}} className={s.tag}>python</a></Tag>
              <Tag><a onClick={()=>{this.scrollToItem('node')}} className={s.tag}>node</a></Tag>
            </div>
            <div className={s.content}>
              <div>
                <h1 id="js" className={s.title} >js</h1>
                <ul>
                  <li><a href="">js</a></li>
                  <li>3</li>
                  <li>3</li>
                </ul>
              </div>
              <div>
                <h1 id="python" className={s.title} >python</h1>
                <ul>
                  <li><a href="">python</a></li>
                  <li>3</li>
                  <li>3</li>
                </ul>
              </div>
              <div>
                <h1 id="node" className={s.title} >node</h1>
                <ul>
                  <li><a href="">node</a></li>
                  <li>3</li>
                  <li>3</li>
                </ul>
              </div>
            </div>
            </section>
          </Col>
        </Row>
      </div>
    )
  }
}
