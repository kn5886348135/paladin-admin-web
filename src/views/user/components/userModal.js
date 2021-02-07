import React, { Component } from 'react'

import { Modal } from 'antd'
import FormComponent from '@c/form/index'
import { validate_phone } from '@/utils/validate'

class UserModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            isModalVisible: false,
            formConfig:{
                url: "jobAdd",
                editKey: "jobId",
                initValue: {
                    number: 0,
                    status: true
                },
                setFieldValue: {},
                formatFormKey: "parentId"
            },
            formLayout: {
                labelCol: {span: 4},
                wrapperCol: { span: 20}
            },
            formItem: [
                { 
                    type: "Input", 
                    label: '用户姓名', 
                    name:'name', 
                    required: true, 
                    style: { width: '200px'},
                    placeholder: '请输入姓名',
                    rules: [
                        { min: 5,message: "不能小于5个字符"}
                    ]
                },
                { 
                    type: "Input", 
                    label: '密码', 
                    name:'password', 
                    required: true, 
                    style: { width: '200px'},
                    placeholder: '请输入姓名',
                    rules: [
                        { min: 5,message: "不能小于5个字符"}
                    ]
                },
                { 
                    type: "Input", 
                    label: '确认密码', 
                    name:'passwords', 
                    required: true, 
                    style: { width: '200px'},
                    placeholder: '请输入姓名',
                    rules: [
                        { min: 5,message: "不能小于5个字符"}
                    ]
                },
                { 
                    type: "Input", 
                    label: '真实姓名', 
                    name:'realname', 
                    required: true, 
                    style: { width: '200px'},
                    placeholder: '请输入姓名',
                    rules: [
                        { min: 5,message: "不能小于5个字符"}
                    ]
                },
                { 
                    type: "Input", 
                    label: '手机号', 
                    name:'phonenum', 
                    required: true,
                    placeholder: "请输入11位手机号",
                    rules: [
                        () => ({
                            validator(rule, value) {
                                // getFieldValue 获取其它dom的值
                                console.log(value)
                                if (validate_phone(value)) {
                                    return Promise.resolve()
                                }
                                return Promise.reject("手机号格式有误")
                            }
                        })
                    ]
                },
                { 
                    type: "Radio", 
                    label: '禁启用', 
                    name:'status', 
                    required: true,
                    options: [
                        {label: "禁用",value: false},
                        {label: "启用",value: true}
                    ]
                }
            ]
        }
    }

    componentDidMount(){
        this.props.onRef(this)
    }

    visibleModal = (status) => {
        this.setState({
            isModalVisible: status
        })
    }
    handleOk = () => {

    }

    handleCancel = () => {

    }

    render(){
        return (
            <Modal title="Basic Modal" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                <FormComponent formItem={this.state.formItem} formLayout={this.state.formLayout} formConfig={this.state.formConfig} submit={this.onHandlerSubmit} submitButton={false}/>
            </Modal>
        )
    }
}

export default UserModal