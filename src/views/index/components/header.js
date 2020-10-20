import React, { Component,Fragment } from 'react'
import { Layout } from 'antd'
import '../layout.scss'
import './aside.scss'

const { Sider, Header, Content, Footer } = Layout

class LayoutHeader extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(h) {
        return (
            <Fragment>
                <h1 className="logo">
                   <span>LOGOsssss</span>
               </h1>
            </Fragment>
        )
    }
}

export default LayoutHeader
