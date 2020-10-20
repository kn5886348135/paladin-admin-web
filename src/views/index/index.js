import React, { Component } from 'react'
import { Layout } from 'antd'
import './layout.scss'
import LayoutAside from './components/aside'
import LayoutHeader from './components/header'
import ContainerMain from '../../components/containerMain/index'
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
                    <Content className="layout-main">
                        <ContainerMain />
                    </Content>
                </Layout>
                <Footer className="layout-footer">底部</Footer>
            </Layout>
        )
    }
}

export default Index
