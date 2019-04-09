import React, { Component } from 'react';
import * as s from './index.less';
import request from "superagent";

interface I_Props {
  _id: string
}

interface I_State {
  _html: I_State_html
}
interface I_State_html {
  __html: string
}

export default class blodDetail extends Component<I_Props, I_State> {

  constructor(props: any) {
    super(props);
    this.state = { 
      _html: {
        __html: ''
      } 
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
      .end(function (err, res) {
        if (err) {
        } else {
          vm.setState({
            _html: vm.createMarkup(res.text),
          })
        }
      });
  }

  

  createMarkup = (text: string) => {
    return { __html: text };
  }
 

  render() {
    return (
      <div className={s.blogDetail + ' markdown-body'} dangerouslySetInnerHTML={this.state._html}>
      </div>
    )
  }
}
