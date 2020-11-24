import React, { Component } from 'react';
import { Button, message, Message } from 'antd'
import { GetSMS } from '../../api/account'
import { validate_email } from '../../utils/validate'

let timer = null

class Code extends Component {
    constructor(props){
        super(props)
        console.log(props)
        this.state = {
            username: props.username,
            code_button_disabled: false,
            code_button_loading: false,
            code_button_text: '获取验证码',
            module: props.module
        }
    }
    // static getDerivedStateFromProps(nextProps, prevProps){
    //     const {props} = nextProps
    //     console.log(props)
    //     console.log('getDerivedStateFromProps')
    //     if (props !== prevProps) {
    //         return {
    //             props
    //         }
    //     }
    //     return null
    // }
    // componentWillReceiveProps(props){
    //     console.log(props+'aa')
    //     console.log('componentWillReceiveProps')
    //     this.setState({
    //         username: props.username
    //     })
    // }
    // 通过ES6扩展的方式只获取需要的属性
    componentWillReceiveProps({username}){
        console.log(username)
        console.log('componentWillReceiveProps')
        this.setState({
            // username: username
            // 数据和key相同的话可以省略
            username
        })
    }

    componentWillUnmount(){
        clearInterval(timer)
    }

    getSMS = values => {
        const username = this.state.username

        if (!username) {
            Message.warning('用户名不能为空', 1)
            return false
        }
        if (!validate_email(username)) {
            Message.warning('用户名格式不正确', 1)
            return false
        }
        console.log('username changed '+this.state.username)
        const requestData = {
            username,
            module:"login"
        }
        this.setState({
            code_button_loading: true,
            code_button_text:'发送中'
        })
        // if (!this.state.flag) {
        //     return false
        // }
        // this.setState({
        //     flag: true
        // })
        GetSMS(requestData).then(response => {
            console.log(response)
            message.success(response.data.message)
            this.countDown()
        }).catch(error => {
            console.log(error)
            this.setState({
                code_button_loading: false,
                code_button_text:'重新获取',
                // flag: true
            })
        })
    }

    countDown = () => {
        // setInterval clearInterval 不间断定时器
        // setTimeout clearTimeout 只执行一次
        
        let sec = 5
        this.setState({
            code_button_loading: false,
            code_button_disabled: true,
            code_button_text:`${sec}S`,
        })
        timer = setInterval(() => {
            sec--
            if (sec <= 0) {
                clearInterval(timer)
                this.setState({
                    code_button_disabled: false,
                    code_button_text: '重新获取',
                    // flag: true
                })
            }
            this.setState({
                code_button_text:`${sec}S`
            })
        }, 1000);
    }
    render(){
        return <Button type="danger" disabled={this.state.code_button_disabled} loading={this.state.code_button_loading} block onClick={this.getSMS}>{this.state.code_button_text}</Button>
    }
}

export default Code