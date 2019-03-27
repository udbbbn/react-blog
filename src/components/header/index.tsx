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
                    <Col span={3} className={s.title}>Son Goku</Col>
                    <Col span={8}>
                        <Router history={history()}>
                            <Breadcrumb separator=" ">
                                <Breadcrumb.Item>
                                    <Link to='/blogList'>主页</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <Link to='/test'>test</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>主页</Breadcrumb.Item>
                                <Breadcrumb.Item>主页</Breadcrumb.Item>
                            </Breadcrumb>
                        </Router>
                    </Col>
                </Row>
            </div>
        )
    }
}
