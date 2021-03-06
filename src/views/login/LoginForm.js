import React from 'react'
import { withRouter } from 'react-router-dom'

import "./index.scss"
import { Form, Input, Button,Row, Col } from 'antd'
import { UserOutlined,UnlockOutlined } from '@ant-design/icons';
import { validatePassword, validate_email } from '../../utils/validate'
import { Login } from '../../api/account'
import Code from '../../components/code/index'
import CryptoJS from 'crypto-js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setTokenAction, setUsernameAction } from '../../store/action/app'
import { setToken, setUsername } from '../../utils/cookies';
class LoginForm extends React.Component{
    constructor(){
        super()
        this.state ={
            username: "",
            code_button_disabled: true,
            code_button_loading: false,
            code_button_text: '获取验证码',
            login_button_loading: false,
            module:"login",
            code:"",
            loading: false
            // button对象有disable属性，其他dom可以使用额外的开关变量在执行点击方法时候判断
            // flag: true 
        }
        // this.form = {
        //     isFieldsTouched: false
        // }
    }
    onFinish = values => {
        console.log('login')
        const requestData = {
            username:this.state.username,
            password:CryptoJS.MD5(this.state.password).toString(),
            code:this.state.code
        }
        this.setState({
            loading:true
        })
        console.log(requestData)
        console.log(this.props.actions.handlerLogin(requestData))
        this.props.actions.handlerLogin(requestData).then(res => {
            this.props.history.push('/index')
        })

        // Login(requestData).then(response => {
        //     console.log(response)
        //     this.setState({
        //         loading: false
        //     })

        //     const data = response.data

        //     this.props.actions.setToken(data.token)
        //     this.props.actions.setUsername(data.username)

        //     setToken(data.data.token)
        //     setUsername(data.data.username)
        //     sessionStorage.setItem("role", data.role)
            
        //     if (response.data.resCode === 0) {
        //         this.setState({
        //             loading:false
        //         })
        //     }
            
        //     console.log(response)
        //     console.log('start to push')
        //     this.props.history.push('/index')
        // }).catch(error => {
        //     this.setState({
        //         loading:true
        //     })
        // })
        console.log('Finish:', values);
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
        console.log(value+'inputchangecode')
        this.setState({
            code: value
        })
    }

    inputChange = (e) => {
        console.log(e)
        let value = e.target.value
        console.log(value)
        this.setState({
            username: value
        })
    }

    
    toggleForm = (value) => {
        this.props.switchForm("regist")
    }
    render(){
        const { username,module,loading } = this.state;
        const _this = this
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
                        // { type: 'string', message:'请输入字符'},
                        ({ getFieldValue }) => ({
                            // ES6解构
                                validator(rule, value) {
                                    if (validate_email(value)) {
                                        _this.setState({
                                            code_button_disabled: false
                                        })
                                        return Promise.resolve();
                                    }
                                  return Promise.reject('The two passwords that you entered do not match!');
                                },
                              }),
                        { max: 20, message: '用户名长度不能超过16个字符'},
                        { min: 6, message: '用户名长度不能少于6个字符'}
                    ]
                } style={{width: '100%'}}>
                        <Input value={username} onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="password" rules={
                        [
                            { required: true, message: 'Please input your password!' },
                            { type: 'string', message:'请输入字符'},
                            { max: 20, message: '密码长度不能超过16个字符'},
                            { min: 6, message: '密码长度不能少于6个字符'},
                            { pattern: validatePassword, message: '密码只能是数字、字母和下划线'}
                        ]} style={{width: '100%'}}>
                        <Input onChange={this.inputChangePassword} prefix={<UnlockOutlined className="site-form-item-icon" />} type="password" placeholder="Password"/>
                    </Form.Item>
                    <Form.Item name="code" rules={
                        [
                            { required: true, message: 'Please input your password!' },
                            { len: 6, message: '请输入6位数验证码!' }
                        ]
                    }>
                        <Row gutter={13}>
                            <Col span={16}>
                            <Input onChange={this.inputChangeCode} prefix={<UnlockOutlined className="site-form-item-icon" />} type="password" placeholder="Code"/>
                            </Col>
                            <Col span={8}>
                                <Code username={username} module={module}/>
                                {/* <Button type="danger" icon={<PoweroffOutlined />} loading={code_button_loading} disabled={code_button_disabled} block onClick={this.getSMS}>获取验证码</Button> */}
                                {/* <Button type="danger" loading={code_button_loading} disabled={code_button_disabled} block onClick={this.getSMS}>{code_button_text}</Button> */}
                                {/* <button type="button" disabled={code_button_disabled} onClick={this.getSMS}>{code_button_text}</button> */}
                            </Col>
                        </Row>
                    </Form.Item>
                    {/* <Form.Item shouldUpdate={true}>{() => (<Button type="primary" htmlType="submit" disabled={!this.form.isFieldsTouched(true) || this.form.getFieldsError().filter(({ errors }) => errors.length).length}>Log in</Button>)}
                    </Form.Item> */}
                    <Form.Item>
                        <Button type="primary" loading={loading} htmlType="submit" className="login-form-button" block>登录</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
    }
}


// FormSearch.propTypes = {
//     config: PropTypes.object
// }

// FormSearch.defaultProps = {
//     batchButton: false
// }


const mapDispatchToProps = (dispatch) => {
    return {
        // listData: bindActionCreators(addDepartmentList, dispatch)
        actions: bindActionCreators({
            setToken: setTokenAction,
            setUsername: setUsernameAction
        }, dispatch)
    }
}

export default connect(
    null,
    mapDispatchToProps
)(withRouter(LoginForm))