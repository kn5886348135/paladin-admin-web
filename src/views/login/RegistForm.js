import React, { Fragment } from 'react'
import "./index.scss"
import { Form, Input, Button, Checkbox,Row, Col } from 'antd'
import { UserOutlined, LockOutlined,UnlockOutlined } from '@ant-design/icons';
import { validatePassword } from '../../utils/validate'

class RegistForm extends React.Component{
    constructor(){
        super()
        this.state ={}
        // this.form = {
        //     isFieldsTouched: false
        // }
    }
    onFinish = values => {
        console.log('Finish:', values);
    }

    toggleForm = (value) => {
        this.props.switchForm("login")
        alert(111)
    }
    render(){
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
                    <Form.Item name="passwordConform" rules={
                        [
                            { required: true, message: 'Please input your password!' },
                            { type: 'string', message:'请输入字符'},
                            { max: 20, message: '密码长度不能超过16个字符'},
                            { min: 6, message: '密码长度不能少于6个字符'},
                            { pattern: validatePassword, message: '密码只能是数字、字母和下划线'}
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
                    <Form.Item name="code" rules={[{ required: true, message: 'Please input your password!' }]}>
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
                        <Button type="primary" htmlType="submit" className="login-form-button" block>注册</Button>
                    </Form.Item>
                </Form>
            </div>
        </Fragment>
        )
    }
}

export default RegistForm