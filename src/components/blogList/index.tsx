import React, { Component, MouseEvent } from "react";
import * as s from "./index.less";
import { Row, Col, Icon, Pagination, Input } from "antd";
import { createHashHistory as history } from "history";
import { Router, Route } from "react-router-dom";
import BlogDetail from "../blogDetail";
import { FormComponentProps } from "antd/lib/form";

const Search = Input.Search;

interface I_Icon {
  type: string;
  text: string;
  key: number;
}
interface I_State {
  showDetail: boolean;
  _id: string
}
interface IProps extends FormComponentProps {
  history: History;
  location: Location;
  [name: string]: any;
}

const IconText = ({ type, text, key }: I_Icon) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} key={key} />
    {text}
  </span>
);

export default class blogList extends Component<IProps, I_State> {
  constructor(props: any) {
    super(props);
    this.state = {
      showDetail: false,
      _id: null
    };
  }

  componentDidMount() {
    this.judgePrams();
  }

  judgePrams() {
    if (this.props.location.search) {
      let id = this.props.location.search.split("id=")[1];
      this.setState({
        showDetail: true,
        _id: id
      });
    }
  }

  pageChange(page: number, pageSize: number) {
    console.log(page, pageSize);
  }

  blogDetail = (e: MouseEvent<HTMLElement>) => {
    const key = (e.currentTarget as HTMLElement).dataset.key;
    // this.setState(
    //   {
    //     showDetail: true
    //   },
    //   () => {
    //     history().push("/blogDetail?id=" + key);
    //   }
    // );
      history().push("/blogDetail?id=" + key);
  };


  /**
   * render博客List
   */
  renderList() {
    return (
      <div>
        {[1, 2, 3, 4, 5].map((el, index) => {
          return (
            <div
              className={s.blog + " flex-c-c"}
              key={index}
              data-key={index}
              onClick={this.blogDetail}
            >
              <div>
                <img className={s.img} src={require("img/bg.jpg")} alt="" />
              </div>
              <div className={s.content + " flex-column-between"}>
                <div className={s.title + " two-ellipsis"}>
                  这篇文章主要是测试文字过长后显示的省略号效果
                  这篇文章主要是测试文字过长后显示的省略号效果
                  这篇文章主要是测试文字过长后显示的省略号效果
                </div>
                <div className={s.description + " two-ellipsis"}>
                  这段描述要长一点 因为要测试省略号效果 这段描述要长一点
                  因为要测试省略号效果 这段描述要长一点 因为要测试省略号效果
                  这段描述要长一点 因为要测试省略号效果
                </div>
                <div className={s.iconArea}>
                  <span>
                    <Icon type="clock-circle" style={{ marginRight: 8 }} />
                    {new Date().getTime()}
                  </span>
                  <span>
                    <Icon type="message" style={{ marginRight: 8 }} />
                    {2}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <Pagination
          className={s.pagination}
          defaultCurrent={1}
          total={50}
          onChange={this.pageChange}
        />
      </div>
    );
  }

  /**
   * render用户信息
   */
  renderUserInfo() {
    return (
      <div className={s.userInfo}>
        <img
          src={require("img/05291132319870.jpg")}
          alt=""
          className={s.avatar}
        />
        <div className={s.name}>Son Goku</div>
        <Search placeholder="搜索文章" onSearch={value => console.log(value)} />
      </div>
    );
  }

  render() {
    // console.log();
    return (
      <div>
        <Row>
          <Col xs={1} sm={1} md={1} lg={1} xl={2} />
          <Col xs={22} sm={22} md={16} lg={16} xl={15}>
            {this.state.showDetail ? <BlogDetail _id={this.state._id} /> : this.renderList()}
          </Col>
          <Col xs={23} sm={23} md={6} lg={6} xl={5}>
            {this.renderUserInfo()}
          </Col>
        </Row>
      </div>
    );
  }
}
