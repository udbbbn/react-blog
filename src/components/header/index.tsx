import React, { Component } from 'react';
import { Row, Col, Breadcrumb } from 'antd';
import { Link, Router } from 'react-router-dom';
import { createHashHistory as history } from 'history'
import * as s from './index.less';

interface Iprop {
    history?: any
}

export default class Header extends Component<Iprop, {}> {

    constructor(props: Iprop) {
        super(props);
    }

    render() {
        return (
            <div className={s.page}>
                <Row type="flex" justify="space-between" className={s.nav + ' flex-none-c'}>
                    <Col span={4} className={s.title}>hello World</Col>
                    <Col span={8}>
                        <Router history={history()}>
                            <Breadcrumb separator=" ">
                                <Breadcrumb.Item>
                                    <Link to='/blogList'>主页</Link>
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
                </Row>
            </div>
        )
    }
}
