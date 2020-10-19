import React, { Component } from 'react'
import { Layout } from 'antd'
import './layout.scss'

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
                <Sider width="250px">菜单栏</Sider>
                <Layout>
                    <Header className="layout-header">头部</Header>
                    <Content className="layout-main">工作区</Content>
                    <Footer className="layout-footer">底部</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default Index
