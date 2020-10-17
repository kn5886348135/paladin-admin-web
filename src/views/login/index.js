import React from 'react'
import "./index.scss"
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';


const HorizontalLoginForm = () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = values => {
    console.log('Finish:', values);
  };

};

ReactDOM.render(<HorizontalLoginForm />, mountNode);


class Login extends React.Component{
    constructor(){
        super()
        this.state ={}
    }
    render(){
        return(
            <div className="form-wrap">
                <div>
                    <div className="form-header">
                        <h4 className="column">登录</h4>
                        <span>账号注册</span>
                </div>
                <div className="form-content">
                    <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
                        <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password"/>
                        </Form.Item>
                        <Form.Item shouldUpdate={true}>{() => (<Button type="primary" htmlType="submit" disabled={!form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length}>Log in</Button>)}
                        </Form.Item>
                    </Form>
                </div>
                </div>
            </div>
        )
    }
}

export default Login