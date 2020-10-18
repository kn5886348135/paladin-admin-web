import React from 'react'
import "./index.scss"
import { Form, Input, Button, Checkbox,Row, Col } from 'antd'
import { UserOutlined, LockOutlined,UnlockOutlined } from '@ant-design/icons';
import LoginForm from './LoginForm'
import RegistForm from './RegistForm'


class Login extends React.Component{
    constructor(){
        super()
        this.state ={
            formType: "login"
        }
        // this.form = {
        //     isFieldsTouched: false
        // }
    }
    
    switchForm = (value) => {
        console.log(value)
        this.setState({
            formType: value
        })
        
    }

    render(){
        return(
            <div className="form-wrap">
                <div>
                    {
                    this.state.formType === 'login'
                    ?<LoginForm switchForm={this.switchForm}></LoginForm>
                    :<RegistForm switchForm={this.switchForm}></RegistForm>}
                </div>
            </div>
        )
    }
}

export default Login