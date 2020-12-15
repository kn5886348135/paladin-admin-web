import React, { Component } from 'react'
import { Layout } from 'antd'
import { MenuFoldOutlined } from '@ant-design/icons'
import '../layout.scss'
import './aside.scss'

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

    render(h) {
        const { collapsed } = this.state
        return (
            <div className={ collapsed ? "collapsed-close" : "" }>
                <h1 className="logo">
                   <span>LOGOsssss</span>
               </h1>
               <div className='header-wrap'>
                   <span className='collapsed-icon' onClick={this.toggleMenu}><MenuFoldOutlined /></span>
               </div>
            </div>
        )
    }
}

export default LayoutHeader
