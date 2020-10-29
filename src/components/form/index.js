import React, { Component, component, Fragment } from 'react'
import { Form, Input, Select } from 'antd'

class FormComponent extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
        console.log(props)
    }

    componentDidMount(){

    }

    inputElement = (item) => {
        return (
            <Form.Item label="部门名称" name="name">
                <Input />
            </Form.Item>
        )
    }

    selectElement = (item) => {
        return (
            <Form.Item label="部门名称aaa" name="nameaaa">
                <Select />
            </Form.Item>
        )
    }

    initFormItem = () => {
        const { formItem } = this.props
        if (!formItem || (formItem && formItem.length === 0)) {
            return false
        }
        const formItemList = []
        formItem.map(item => {
            if (item.type === 'Input') {
                formItemList.push(this.inputElement());
            }
            if (item.type === 'Select') {
                formItemList.push(this.selectElement());
            }
        })
        return(
            <Fragment></Fragment>
        )
    }

    render(){
        return(
            <Form ref="form" onFinish={this.onSubmit} initialValues={{ status:true,number:0 }} {...this.state.formLayout}>
                { this.initFormItem }
            </Form>
        )
    }
}

export default FormComponent