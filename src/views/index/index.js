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
            collapsed: false
        }
    }

    componentDidMount(){
        const collapsed = JSON.parse(sessionStorage.getItem('collapsed'))
        this.setState({
            collapsed
        })
    }
    toggleCollapsed = () => {
        const collapsed = !this.state.collapsed
        this.setState({
            collapsed
        })
        sessionStorage.setItem('collapsed', collapsed)
    }

    render(h) {
        return (
            <Layout className="layout-wrap">
                <Header className="layout-header">
                    <LayoutHeader toggle={this.toggleCollapsed} collapsed={this.state.collapsed}/>
                </Header>
                <Layout>
                    <Sider width="250px" collapsed={this.state.collapsed}>
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
