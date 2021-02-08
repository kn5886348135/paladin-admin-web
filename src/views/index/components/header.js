import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { MenuFoldOutlined } from '@ant-design/icons'
import '../layout.scss'
import './aside.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logoutAction  } from '@/store/action/app'
class LayoutHeader extends Component {
    constructor(props){
        super(props)
        this.state = {
            collapsed: props.collapsed
        }
    }

    componentWillReceiveProps ({ collapsed }){
        console.log(collapsed)
        this.setState({
            collapsed: collapsed
        })
    }

    toggleMenu = () => {
        this.props.toggle()
    }

    // 退出，清除cookie和token
    logout = () => {
        this.props.actions.logout()
    }

    // 退出可以使用antd的退出组件
    render(h) {
        const { collapsed } = this.state
        return (
            <div className={ collapsed ? "collapsed-close" : "" }>
                <h1 className="logo">
                   <span>LOGOsssss</span>
               </h1>
               <div className='header-wrap'>
                   <span className='col-left collapsed-icon' onClick={this.toggleMenu}><MenuFoldOutlined /></span>
                   <div className="col-right" onClick={this.logout}>退出</div>
               </div>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        // listData: bindActionCreators(addDepartmentList, dispatch)
        actions: bindActionCreators({
            logout: logoutAction
        }, dispatch)
    }
}

export default connect(
    null,
    mapDispatchToProps
)(withRouter(LayoutHeader))

// export default LayoutHeader
