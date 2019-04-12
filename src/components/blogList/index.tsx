import React, { Component, MouseEvent } from "react";
import * as s from "./index.less";
import { Row, Col, Icon, Pagination, Input } from "antd";
import { createHashHistory as history } from "history";
import { Router, Route } from "react-router-dom";
import BlogDetail from "../blogDetail";
import { FormComponentProps } from "antd/lib/form";
import request from "superagent";

const Search = Input.Search;

interface I_Icon {
  type: string;
  text: string;
  key: number;
}
interface I_State {
  showDetail: boolean;
  _id: string,
  blogList: Array<object>,
  allCount: number,
  pageSize: number
}
interface IProps extends FormComponentProps {
  history: History;
  location: Location;
  [name: string]: any;
}
interface I_BlogList {
  title: string,
  fileName: string,
  _id: string,
  description: string,
  date: string
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
      _id: null,
      blogList: [],
      allCount: 10,
      pageSize: 5
    };
  }

  componentWillMount() {
    this.fetchData();
  }
  componentDidMount() {
    this.judgePrams();
  }

  /**
   * 获取参数更换视图
   */
  judgePrams() {
    if (this.props.location.search) {
      let id = this.props.location.search.split("id=")[1];
      this.setState({
        showDetail: true,
        _id: id
      });
    }
  }
  
  /**
   * 获取blog列表
   * @param _id string 当前数据列表最后一条或第一条 用于翻页 
   * @param pageState boolean 判断是上一页还是下一页
   */
  fetchData(page = 0) {
    const vm = this;
    request
      .get(`http://127.0.0.1:3000/blogDetail?pageSize=${vm.state.pageSize}&page=${page}`)
      .end(function (err, res: any) {
        if (err) {
        } else {
          if (res.body.code === 200) {
            const data = res.body.data;
            vm.setState({
              blogList: data,
              allCount: res.body.count
            })
          }
        }
      });
  }

  /**
   * 更换页码
   */
  pageChange = (page: number, pageSize: number) => {
      this.fetchData(page - 1)
  }

  /**
   * 更改视图
   */
  blogDetail = (e: MouseEvent<HTMLElement>) => {
    const key = (e.currentTarget as HTMLElement).dataset.key;
    history().push("/blogDetail?id=" + key);
  };


  /**
   * render博客List
   */
  renderList() {
    return (
      <div>
        {this.state.blogList.map((el: I_BlogList, index) => {
          return (
            <div
              className={s.blog + " flex-c-c"}
              key={index}
              data-key={el._id}
              onClick={this.blogDetail}
            >
              <div>
                <img className={s.img} src={require("img/bg.jpg")} alt="" />
              </div>
              <div className={s.content + " flex-column-between"}>
                <div className={s.title + " two-ellipsis"}>{el.title}
                </div>
                <div className={s.description + " two-ellipsis"}>{el.description}
                </div>
                <div className={s.iconArea}>
                  <span>
                    <Icon type="clock-circle" style={{ marginRight: 8 }} />
                    {el.date}
                  </span>
                  {/* <span>
                    <Icon type="message" style={{ marginRight: 8 }} />
                    {2}
                  </span> */}
                </div>
              </div>
            </div>
          );
        })}
        <Pagination
          className={s.pagination}
          defaultCurrent={1}
          defaultPageSize={this.state.pageSize}
          total={this.state.allCount}
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
