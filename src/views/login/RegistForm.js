import React, { Fragment } from 'react'
import "./index.scss"
import { Form, Input, Button, Checkbox,Row, Col, message } from 'antd'
import { UserOutlined, LockOutlined,UnlockOutlined } from '@ant-design/icons';
import { validate_email, validatePassword, validate_password } from '../../utils/validate'
import Code from '../../components/code/index'
import { Regist } from '../../api/account'
import CryptoJS from 'crypto-js'

class RegistForm extends React.Component{
    constructor(){
        super()
        this.state ={
            username:"",
            password:"",
            code:"",
            module:"register"
        }
        // this.form = {
        //     isFieldsTouched: false
        // }
    }
    onFinish = values => {

        const requestData = {
            username:this.state.username,
            password: CryptoJS.MD5(this.state.password).toString(),
            code:this.state.code,
            module:"register"
        }
        // console.log(JSON.stringify(requestData)+'requestdata')
        console.log('Finish:', values);
        Regist(requestData).then(res => {
            const data = res.data;
            console.log(res)
            message.success(data.message)
            if (data.resCode === 0) {
                this.toggleForm()
            }
        }).catch(error => {
            
        })
    }

    inputChangeUsername = (e) => {
        let value = e.target.value
        console.log(value)
        this.setState({
            username: value
        })
    }
    inputChangePassword = (e) => {
        let value = e.target.value
        console.log(value)
        this.setState({
            password: value
        })
    }
    inputChangeCode = (e) => {
        let value = e.target.value
        console.log(value+'codechange')
        this.setState({
            code: value
        })
    }
    inputChange = (e) => {
        console.log(e)
        let value = e.target.value
        console.log(value+'usernamechange')
        this.setState({
            username: value
        })
    }

    toggleForm = (value) => {
        this.props.switchForm("login")
        alert(111)
    }
    render(){
        const { username,module } = this.state

        return(
            <Fragment>
            <div className="form-header">
                <h4 className="column">注册</h4>
                <span onClick={this.toggleForm}>登录</span>
            </div>
            <div className="form-content">
                <Form 
                name="normal_login" 
                className="login-form"
                // name="horizontal_login"
                initialValues={{remember: true}}
                layout="inline" 
                onFinish={this.onFinish}>
                <Form.Item name="username" rules={
                    [
                        { required: true, message: '请输入用户名!' },
                        { type: 'string',  message:'请输入字符'},
                        { max: 20, message: '用户名长度不能超过16个字符'},
                        { min: 6, message: '用户名长度不能少于6个字符'}
                    ]
                } style={{width: '100%'}}>
                        <Input onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="password" rules={
                        [
                            { required: true, message: '请输入密码!' },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    console.log(rule)
                                    console.log(value)
                                    if (!validate_password(value)) {
                                        return Promise.reject("请输入6-16位密码!")
                                    }

                                    const passwordConfirm = getFieldValue('passwordConfirm')
                                    const password = getFieldValue('passwordConfirm')
                                    if (passwordConfirm) {
                                        if (password !== passwordConfirm) {
                                            return Promise.reject("两次输入的密码不一致!")
                                        }
                                    }
                                    return Promise.resolve()
                                }
                            }),
                            // { type: 'string', message:'请输入字符'},
                            { max: 20, message: '密码长度不能超过16个字符'},
                            { min: 6, message: '密码长度不能少于6个字符'},
                            // { pattern: validatePassword, message: '密码只能是数字、字母和下划线'}
                        ]} style={{width: '100%'}}>
                        <Input onChange={this.inputChangePassword} prefix={<UnlockOutlined className="site-form-item-icon" />} type="password" placeholder="Password"/>
                    </Form.Item>
                    <Form.Item name="passwordConfirm" rules={
                        [
                            { required: true, message: '请输入密码!' },
                            { type: 'string', message:'请输入字符'},
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    console.log(getFieldValue('password'))
                                    console.log(rule)
                                    console.log(value)
                                    if (value !== getFieldValue('password')) {
                                        return Promise.reject("两次输入的密码不一致!")
                                    }
                                    return Promise.resolve()
                                }
                            }),
                            { max: 20, message: '密码长度不能超过16个字符'},
                            { min: 6, message: '密码长度不能少于6个字符'},
                            // { pattern: validatePassword, message: '密码只能是数字、字母和下划线'}
                            // ({ getFieldValue }) => ({
                            // ES6解构
                            //     validator(rule, value) {
                            //       if (!value || getFieldValue('password') === value) {
                            //         return Promise.resolve();
                            //       }
                            //       return Promise.reject('The two passwords that you entered do not match!');
                            //     },
                            //   })
                        ]} style={{width: '100%'}}>
                        <Input prefix={<UnlockOutlined className="site-form-item-icon" />} type="password" placeholder="Password"/>
                    </Form.Item>
                    <Form.Item name="code" rules={[{ required: true, message: '请输入验证码!' }]}>
                        <Row gutter={13}>
                            <Col span={15}>
                                <Input onChange={this.inputChangeCode} prefix={<UnlockOutlined className="site-form-item-icon" />} type="password" placeholder="Code"/>
                            </Col>
                            <Col span={9}>
                                <Code username={ username } module={module} />
                                {/* <Button block>获取验证码</Button> */}
                            </Col>
                        </Row>
                    </Form.Item>
                    {/* <Form.Item shouldUpdate={true}>{() => (<Button type="primary" htmlType="submit" disabled={!this.form.isFieldsTouched(true) || this.form.getFieldsError().filter(({ errors }) => errors.length).length}>Log in</Button>)}
                    </Form.Item> */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" block>注册</Button>
                    </Form.Item>
                </Form>
            </div>
        </Fragment>
        )
    }
}

export default RegistForm