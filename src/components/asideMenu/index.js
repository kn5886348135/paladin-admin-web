import React, { Component, Fragment } from 'react';
import { Link,withRouter } from 'react-router-dom'
import './aside.scss'
import { Menu } from 'antd'
import { connect } from 'react-redux'
import { UserOutlined } from '@ant-design/icons';
import Router from '../../router/router'

const { SubMenu } = Menu
class AsideMenu extends Component {
    constructor(props){
        super(props)
        this.state = {
            // router: [],
            selectedKeys:['/index/user/list'],
            openKeys:['/index/user']
        }
        console.log(Router)
    }

    // 弃用方法,挂在之前过滤权限对应的路由,可以考虑递归处理
    // UNSAFE_componentWillMount(){
    //     const role = sessionStorage.getItem("role").split(",")
    //     console.log(role)
    //     let routerArray = []
    //     if (role.includes("admin")) {
    //         routerArray = Router
    //     }else{
    //         routerArray = Router.filter((item) => {
    //             console.log(item)
    //             if (this.hasPermission(role,item)) {
    //                 if (item.child && item.child.length>0) {
    //                     item.child = item.child.filter((child) => {
    //                         if (this.hasPermission(role,child)) {
    //                             return child
    //                         }
    //                         return false
    //                     })
    //                     return item
    //                 }
    //                 return item
    //             }
    //             return false
    //         })
    //     }
    //     this.setState({
    //         router: routerArray
    //     })
    //     console.log(routerArray)
    // }

    // //
    // hasPermission = (role,router) => {
    //     if (router.role && router.role.length >0) {
    //         return role.some(element => router.role.indexOf(element) >= 0)
    //     }
    // }

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
        const { selectedKeys, openKeys,routers } = this.state
        // const { routers } = this.props
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
                        routers && routers.map(item => {
                            return item.children && item.children.length>0?this.renderSubMenu(item):this.renderMenu(item)
                        })
                    }
                </Menu>
            </Fragment>
        )
    }
}

// const mapStateToProps = (state) => ({
//     routers: state.app.routers
// })

// const mapDispatchToProps = (dispatch) => {
//     return {
//         // listData: bindActionCreators(addDepartmentList, dispatch)
//         actions: bindActionCreators({
//             setToken: setTokenAction,
//             setUsername: setUsernameAction
//         }, dispatch)
//     }
// }

// export default connect(
//     mapStateToProps,
//     null
// )(withRouter(AsideMenu))

export default AsideMenu
