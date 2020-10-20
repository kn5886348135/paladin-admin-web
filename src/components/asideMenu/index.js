import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
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

        }
        console.log(Router)
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
        return (
            <Fragment >
               <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={this.state.collapsed}
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

export default AsideMenu
