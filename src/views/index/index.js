import React, { Component } from 'react'
import { Layout } from 'antd'
import './layout.scss'
import LayoutAside from './components/aside'
import LayoutHeader from './components/header'

const { Sider, Header, Content, Footer } = Layout

class Index extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(h) {
        return (
            <Layout className="layout-wrap">
                <Header className="layout-header">
                    <LayoutHeader/>
                </Header>
                <Layout>
                    <Sider width="250px">
                        <LayoutAside />
                    </Sider>
                    <Content className="layout-main">工作区</Content>
                    <Footer className="layout-footer">底部</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default Index
