import React, { Fragment } from 'react'
import "./index.scss"
import { Form, Input, Button, Checkbox,Row, Col } from 'antd'
import { UserOutlined, LockOutlined,UnlockOutlined } from '@ant-design/icons';
import { validatePassword } from '../../utils/validate'
import { Login } from '../../api/account'

class LoginForm extends React.Component{
    constructor(){
        super()
        this.state ={}
        // this.form = {
        //     isFieldsTouched: false
        // }
    }
    onFinish = values => {
        console.log('login')
        Login().then(response => {
            console.log(response)
        }).catch(error => {
            
        })
        console.log('Finish:', values);
    }

    toggleForm = (value) => {
        this.props.switchForm("regist")
        alert(111)
    }
    render(){
        return(
            <div>
            <div className="form-header">
                <h4 className="column">登录</h4>
                <span onClick={this.toggleForm}>账号注册</span>
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
                        { type: 'string', message:'请输入字符'},
                        { max: 20, message: '用户名长度不能超过16个字符'},
                        { min: 6, message: '用户名长度不能少于6个字符'}
                    ]
                } style={{width: '100%'}}>
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="password" rules={
                        [
                            { required: true, message: 'Please input your password!' },
                            { type: 'string', message:'请输入字符'},
                            { max: 20, message: '密码长度不能超过16个字符'},
                            { min: 6, message: '密码长度不能少于6个字符'},
                            { pattern: validatePassword, message: '密码只能是数字、字母和下划线'}
                        ]} style={{width: '100%'}}>
                        <Input prefix={<UnlockOutlined className="site-form-item-icon" />} type="password" placeholder="Password"/>
                    </Form.Item>
                    <Form.Item name="code" rules={
                        [
                            { required: true, message: 'Please input your password!' },
                            { len: 6, message: '请输入6位数验证码!' }
                        ]
                    }>
                        <Row gutter={13}>
                            <Col span={16}>
                            <Input prefix={<UnlockOutlined className="site-form-item-icon" />} type="password" placeholder="Code"/>
                            </Col>
                            <Col span={8}>
                                <Button block>获取验证码</Button>
                            </Col>
                        </Row>
                    </Form.Item>
                    {/* <Form.Item shouldUpdate={true}>{() => (<Button type="primary" htmlType="submit" disabled={!this.form.isFieldsTouched(true) || this.form.getFieldsError().filter(({ errors }) => errors.length).length}>Log in</Button>)}
                    </Form.Item> */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" block>登录</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
    }
}

export default LoginForm