import React, { Component, component, Fragment } from 'react'
import { Form, Input, Select, Button } from 'antd'

class FormComponent extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
        console.log(props)
    }

    componentDidMount(){

    }

    rules = (item) => {
        let rules = []
        if (item.required) {
            let message = item.message || `${item.label}不能为空`
            rules.push({required: true,message: message})
        }
        if (item.rules && item.rules.length > 0) {
            rules = rules.concat(item.rules)
        }
    }

    inputElement = (item) => {
        const rules = this.rules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <Input />
            </Form.Item>
        )
    }

    selectElement = (item) => {
        const rules = this.rules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={item.rules || []}>
                <Select />
            </Form.Item>
        )
    }

    initFormItem = (item) => {
        const { formItem } = this.props
        if (!formItem || (formItem && formItem.length === 0)) {
            return false
        }
        const formItemList = []
        formItem.map(item => {
            if (item.type === 'Input') {
                formItemList.push(this.inputElement(item));
            }
            if (item.type === 'Select') {
                formItemList.push(this.selectElement(item));
            }
        })
        return formItemList
    }

    onSubmit = (value) => {

    }

    render(){
        return(
            <Form ref="form" onFinish={this.onSubmit} initialValues={{ status:true,number:0 }} {...this.state.formLayout}>
                { this.initFormItem() }
                <Form.Item >
                        <Button loading={this.state.loading} htmlType="submit" type="primary" >确定</Button>
                    </Form.Item>
            </Form>
        )
    }
}

export default FormComponent