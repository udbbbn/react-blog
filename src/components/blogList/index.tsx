import React, { Component } from 'react';
import * as s from './index.less';
import request from 'superagent'
import { Row, Col, Icon, Pagination, Input } from 'antd';

const Search = Input.Search;

interface I_Icon {
  type: string,
  text: string,
  key: number
}

const IconText = ({ type, text, key }: I_Icon) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} key={key} />
    {text}
  </span>
);


export default class blogList extends Component {
  

  componentDidMount() {

  }

  pageChange(page:number, pageSize:number) {
    console.log(page, pageSize)
  }

  /**
   * render博客List
   */
  renderList() {
    return (
      <div>
        {
          [1, 2, 3, 4, 5].map((el, index) => {
            return (
              <div className={s.blog + ' flex-c-c'} key={index}>
                  <div>
                    <img className={s.img} src={require('img/bg.jpg')} alt="" />
                  </div>
                  <div className={s.content + ' flex-column-between'}>
                    <div className={s.title + " two-ellipsis"}>
                      这篇文章主要是测试文字过长后显示的省略号效果
                      这篇文章主要是测试文字过长后显示的省略号效果
                      这篇文章主要是测试文字过长后显示的省略号效果
                </div>
                    <div className={s.description + ' two-ellipsis'}>
                      这段描述要长一点 因为要测试省略号效果
                      这段描述要长一点 因为要测试省略号效果
                      这段描述要长一点 因为要测试省略号效果
                      这段描述要长一点 因为要测试省略号效果
                </div>
                    <div className={s.iconArea}>
                      <span>
                        <Icon type="clock-circle" style={{ marginRight: 8 }} />
                        {
                          new Date().getTime()
                        }
                      </span>
                      <span>
                        <Icon type="message" style={{ marginRight: 8 }} />
                        {
                          2
                        }
                      </span>
                    </div>
                  </div>
              </div>
            )
          })
        }
        <Pagination className={s.pagination} defaultCurrent={1} total={50}
          onChange={this.pageChange}
        />
      </div>
    )
  }

  renderUserInfo() {
    return (
      <div className={s.userInfo}>
        <img src={require('img/05291132319870.jpg')} alt="" className={s.avatar} />
        <div className={s.name}>Son Goku</div>
        <Search
          placeholder="搜索文章"
          onSearch={value => console.log(value)}
        ></Search>
      </div>
    )
  }


  render() {
    // request.get('http://127.0.0.1:3000/api').end()
    return (
      <div>
      <Row>
        <Col xs={1} sm={1} md={1} lg={1} xl={3}></Col>
        <Col xs={2} sm={4} md={16} lg={8} xl={10}>
          {this.renderList()}
        </Col>
        <Col xs={1} sm={1} md={6} lg={1} xl={3}>
          {this.renderUserInfo()}
        </Col>
      </Row>
      </div>
    )
  }
}
