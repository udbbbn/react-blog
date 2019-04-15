import React, { Component } from 'react';
import * as s from './index.less';
import request from "superagent";

interface I_Props {
  _id: string
}

interface I_State {
  _html: I_State_html,
  notFound: boolean
}
interface I_State_html {
  __html: string
}
interface I_Response {
  code: number,
  text: string,
  count: number
}

export default class blodDetail extends Component<I_Props, I_State> {

  constructor(props: any) {
    super(props);
    this.state = { 
      _html: {
        __html: ''
      } ,
      notFound: false
    }
  }

  componentWillMount() {
    this.fetchData();
  }

  /**
   * 抓取数据
   */
  fetchData() {
    const id = this.props._id;
    const vm = this;
    request
      .get("http://127.0.0.1:3000/blogDetail/" + id)
      .end(function (err, res: any) {
        if (err) {
        } else {
          if (res.body.code === 200) {
            vm.setState({
              notFound: false,
              _html:vm.createMarkup(res.body.data),
            })
          } else {
            vm.setState({
              notFound: true
            })
          }
        }
      });
  }

  render404() {
    return (
      <img src={require("img/404.png")} alt="" className={s.pageNotFound} />
    )
  }

  createMarkup = (text: string) => {
    return { __html: text };
  }
 

  render() {
      {
        if (this.state.notFound) {
          return (
            <div className={s.wrapper}>
              {this.render404()}
            </div>
          )
        } else {
          return (
            <div className={s.blogDetail + ' markdown-body'} dangerouslySetInnerHTML={this.state._html}>
            </div>
          )
        }
      }
  }
}
