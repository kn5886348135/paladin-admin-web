import React, { Component, Fragment } from 'react';
import { Link,withRouter } from 'react-router-dom'
import './aside.scss'
import { Menu } from 'antd'
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
    SettingOutlined,
    UserOutlined
  } from '@ant-design/icons';
import Router from '../../router/router'

const { SubMenu } = Menu
class AsideMenu extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedKeys:['/index/user/list'],
            openKeys:['/index/user']
        }
        console.log(Router)
    }

    componentDidMount(){
        const pathname = this.props.location.pathname
        const menuKey = pathname.split('/').slice(0,3).join('/')
        
        const menuHeight = {
            selectedKeys: pathname,
            openKeys: menuKey
        }

        this.menuHeightLight(menuHeight)
    }

    selectMenu = ({ item, key, keyPath, domEvent}) => {
        const menuKey = keyPath[keyPath.length -1]
        console.log('click menu')
        const menuHeight = {
            selectedKeys: key,
            openKeys: menuKey
        }
        this.menuHeightLight(menuHeight)
    }

    openMenuChange = (openKeys) => {
        this.setState({
            openKeys:[openKeys[openKeys.length - 1]],

        })
    }
    // menuHeightLight = (params) => {
    //     this.setState({
    //         selectedKeys: [params.selectedKeys],
    //         openKeys: [params.openKeys]
    //     })
    // }
    menuHeightLight = ({selectedKeys, openKeys}) => {
        this.setState({
            selectedKeys: [selectedKeys],
            openKeys: [openKeys]
        })
    }
    renderSubMenu = ({title, path, children}) => {
        return (
            <SubMenu key={path} icon={<UserOutlined />} title={title}>
                {
                    children && children.map(item => {
                        return item.children && item.children.length>0?this.renderSubMenu(item):this.renderMenu(item)
                    })
                }
            </SubMenu>
        )
    }

    renderMenu = ({title, path}) => {
        return (
        <Menu.Item key={path}>
            <Link to={path}>
                <span>{title}</span>
            </Link>
        </Menu.Item>
        )
    }

    render(h) {
        const { selectedKeys, openKeys } = this.state
        return (
            <Fragment >
               <Menu
                onClick={this.selectMenu}
                onOpenChange={this.openMenuChange}
                selectedKeys={selectedKeys}
                openKeys={openKeys}
                mode="inline"
                theme="dark"
                collapsed={this.state.collapsed}
                >
                    {
                        Router && Router.map(item => {
                            return item.children && item.children.length>0?this.renderSubMenu(item):this.renderMenu(item)
                        })
                    }
                </Menu>
            </Fragment>
        )
    }
}

export default withRouter(AsideMenu)
