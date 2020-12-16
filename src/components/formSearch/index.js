import React, { Component } from 'react'
import { Form, Input, Select, Button, InputNumber, Radio, message } from 'antd'
import { formSubmit } from '@api/common'
import requestUrl from "@api/requesturl"
import PropTypes from 'prop-types'
import Global from "@/js/global"

const { Option } = Select

class FormSearch extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            messagePrefix:{
                "Input":'请输入',
                "Radio":'请选择',
                "Select":'请选择'
            }
        }
        console.log(props)
    }

    componentDidMount(){

    }

    rules = (item) => {
        const { messagePrefix } = this.state
        let rules = []
        if (item.required) {
            let message = item.message || `${messagePrefix[item.type]}${item.label}`
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
                <Input style={item.style} placeholder={item.placeholder} />
            </Form.Item>
        )
    }

    selectElement = (item) => {
        // const rules = this.rules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={item.rules || []}>
                <Select style={item.style} placeholder={item.placeholder} >
                    {
                        item.options && item.options.map(ele => {
                        return <Option value={ele.value} key={ele.value}>{ele.label}</Option>
                        })
                    }
                </Select>
            </Form.Item>
        )
    }

    inputNumberElement = (item) => {
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={item.rules || []}>
                <InputNumber min={item.min} max={item.max}/>
            </Form.Item>
        )
    }

    radioElement = (item) => {
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={item.rules || []}>
                <Radio.Group>
                    {
                    item.options && item.options.map(ele => {
                        return <Radio value={ele.value} key={ele.value}>{ele.label}</Radio>
                    })
                    }
                </Radio.Group>
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
                console.log(global[item.optionsKey]);
                item.options = global[item.optionsKey];
                formItemList.push(this.selectElement(item));
            }
            if (item.type === 'InputNumber') {
                formItemList.push(this.inputNumberElement(item));
            }
            if (item.type === 'Radio') {
                formItemList.push(this.radioElement(item));
            }
        })
        return formItemList
    }

    // add edit
    onSubmit = (value) => {
        console.log(value)
        const searchData = {};
        for (let key in value) {
            console.log(key);
            console.log(value[key]);
            if (value[key] !== undefined && value[key] !== "") {
                searchData[key] = value[key]
            }
            // if (Object.hasOwnProperty.call(oblet key)) {
            //     const element = olet[key];
                
            // }
            console.log(searchData);
        }
        
        this.props.search(value)

        
    }

    render(){
        return(
            <Form layout="inline" ref="form" onFinish={this.onSubmit} initialValues={{ status:true,number:0 }} {...this.props.formLayout}>
                { this.initFormItem() }
                <Form.Item >
                        <Button loading={this.state.loading} htmlType="submit" type="primary" >确定</Button>
                </Form.Item>
            </Form>
        )
    }
}

FormSearch.propTypes = {
    config: PropTypes.object
}

FormSearch.defaultProps = {
    batchButton: false
}

export default FormSearch