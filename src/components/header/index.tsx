import React, { Component } from 'react';
import { Row, Col, Breadcrumb, Menu, Dropdown, Icon, message } from 'antd';
import { Link, Router, withRouter  } from 'react-router-dom';
import { createHashHistory as history } from 'history'
import * as s from './index.less';

interface Iprop {
    history?: any
}

const menuClick = ({key} : any) : void => {
    history().push(`${key}`);
}

const menu = (
    <Menu onClick={menuClick}>
            <Menu.Item key="/">主页
            </Menu.Item>
            <Menu.Item key="/classification">分类
            </Menu.Item>
            <Menu.Item key="/about">关于
            </Menu.Item>
    </Menu>
);



export default class Header extends Component<any, {}> {

    constructor(props: any) {
        super(props);
    }
    

    render() {
        return (
            <div className={s.page}>
                <Row type="flex" justify="space-between" className={s.nav + ' flex-none-c'}>
                    <Col xs={8} sm={6} md={4} lg={4} xl={4} className={s.title}>hello World</Col>
                    <Col xs={8} sm={6} md={4} lg={4} xl={4} className={s.option}>
                        <Router history={history()}>
                            <Breadcrumb separator=" ">
                                <Breadcrumb.Item>
                                    <Link to='/'>主页</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <Link to='/classification'>分类</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <Link to='/about'>关于</Link>
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </Router>
                    </Col>
                    <Dropdown overlay={menu} trigger={['click']} className={s.menu} 
                        overlayStyle={{width: '100vw', backgroundColor: 'antiquewhite'}}>
                        <a className="ant-dropdown-link" href="#">
                            <Icon type="bars" style={{ fontSize: '20px', color: '#545454' }} />
                        </a>  
                    </Dropdown>
                </Row>
            </div>
        )
    }
}


