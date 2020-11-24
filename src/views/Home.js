import React, { Component, Fragment } from 'react'
import { Button } from "antd"

class Home extends React.Component{
    constructor(){
        super()
        this.state = {}
    }

    render(){
        return(
            <Fragment>
                <h1>Home</h1>
                <Button type="primary">这是一个大按钮</Button>
            </Fragment>
        )
    }
}

export default Home