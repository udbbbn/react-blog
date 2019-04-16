import React, { Component, MouseEvent } from 'react';
import * as s from './index.less';
import { Row, Col, Tag } from 'antd';
import request from "superagent";
import { FormComponentProps } from "antd/lib/form";
import { createHashHistory as history } from "history";

interface I_State {
  classObj: Object
}
interface I_Props extends FormComponentProps {
  history: History;
  location: Location;
  [name: string]: any;
}
interface I_Class {
  children: Array<object>,
  count: number,
  target: string
}

interface I_BlogList {
  title: string,
  fileName: string,
  description: string,
  date: string,
  _id: string,
  class: string
}

export default class classification extends Component<I_Props, I_State> {

  constructor(prop: I_Props) {
    super(prop);
    this.state = {
      classObj: {}
    }
  }
  
  componentWillMount() {
    this.fetchData();
  }

    /**
   * 抓取数据
   */
  fetchData() {
    const vm = this;
    request
      .get("http://127.0.0.1:3000/class")
      .end(function (err, res: any) {
        if (err) {
        } else {
          vm.setState({
            classObj: res.body.data
          })
        }
      });
  }


  scrollToItem = (domId: string) => {
    if (domId) {
      let dom = document.getElementById(domId);
      if (dom) {
        dom.scrollIntoView();
      }
    }
  }
  /**
   * 更改视图
   */
  blogDetail = (e: MouseEvent<HTMLElement>) => {
    const key = (e.currentTarget as HTMLElement).dataset.key;
    history().push("/blogDetail?id=" + key);
  };


  // 渲染分类
  renderNavClass() {
    const obj:any = this.state.classObj;
    return (
      <div>
        {
          Object.keys(obj).map((el: string, index) => {
            return (
              <Tag key={index} className={s.mb5px}>
                <a onClick={() => {this.scrollToItem(`${obj[el].target}`)}} className={s.tag}>{obj[el].target}</a>
                <span className={s.tip}>{`${obj[el].count}`}</span>
              </Tag>
            )
          })
        }
      </div>
    )
  }

  renderCalssDetail() {
    const obj:any = this.state.classObj;
    return (
      <div>
      {
        Object.keys(obj).map((el: string, index) => {
          return (
            <div key={index}>
              <h1 id={el} className={s.title}>{el}</h1>
              <ul>
              {
                obj[el].children.map((ele:I_BlogList, index: number) => {
                  return (
                    <li key={index}>
                      <a
                        data-key={ele._id}
                        onClick={this.blogDetail}>{ele.title}</a>
                    </li>
                  )
                })
              }
              </ul>
            </div>
          )
        })
      }
      </div>
    )
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={2} sm={2} md={4} lg={4} xl={4}></Col>
          <Col xs={22} sm={22} md={16} lg={8} xl={10}>
            <section className={s.wrapper}>
            <div className={s.classWrapper}>
            {this.renderNavClass()}
            </div>
            <div className={s.content}>
              {this.renderCalssDetail()}
            </div>
            </section>
          </Col>
        </Row>
      </div>
    )
  }
}
