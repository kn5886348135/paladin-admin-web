import React, { Component } from 'react'
import { Form, Input, Select, Button, InputNumber, Radio, message, DatePicker } from 'antd'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import { formSubmit } from '@api/common'
import requestUrl from "@api/requesturl"
import PropTypes from 'prop-types'
import FormSearch from '../formSearch'
import SelectComponent from '../select/index'
import UploadComponent from '../upload/index'
import EditorComponent from '../editor/index'

const { Option } = Select

class FormComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            messagePrefix:{
                "Input":'请输入',
                "Radio":'请选择',
                "Select":'请选择',
                "Date":'请选择',
                "Upload": "请上传",
                "Editor": "请输入",
                "SelectComponent": "请选择"
            }
        }
        console.log(props)
    }

    componentDidMount(){

    }

    componentWillReceiveProps({ formConfig }){
        this.refs.form.setFieldsValue(formConfig.setFieldValue)
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

    validatorSelect = (rule, value) => {
        console.log(value)
        if (!value || !value[rule.field]) {
            return Promise.reject("选项不能为空")
        }
        return Promise.resolve()
    }
    
    validateComponents = (rule, value) => {
        console.log(value)
        if (value) {
            return Promise.resolve()
        }
        // return Promise.reject("")
        return Promise.reject("选项不能为空")
    }

    inputElement = (item) => {
        const rules = this.rules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules} shouldUpdate={ item.uploadField || false} >
                <Input type={item.value_type || "text"} style={item.style} placeholder={item.placeholder} />
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

    selectComponentElement = (item) => {
        // const rules = this.rules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={item.rules || []}>
                <SelectComponent url={item.url} props={item.param} initValue={this.props.formConfig.setFieldValue} />
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

    // 插槽
    slotElement = (item) => {
        const rules = this.rules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={ rules }>
                { this.props.children ? this.props.children.filter(elem => console.log(elem.ref)) : "" }
                {/* { this.props.children ? this.props.children.filter(elem => elem.ref === item.slotName)[0] : "" } */}
                { console.log(Array.isArray(this.props.children)) }
                { this.props.children && Array.isArray(this.props.children) ? this.props.children.filter(elem => console.log(elem.ref)) : this.props.children }
            </Form.Item>
        )
    }

    columnElement = (item) => {
        const rules = this.rules(item)
        return (
            <div class="form-column">
                <h4>{ item.label }</h4>
            </div>
        )
    }

    dateElement = (item) => {
        const rules = this.rules(item)
        return (
            <Form.item label={item.label} name={item.name} key={item.name} rules={[...rules,{validator: this.validateComponents}]}>
                <DatePicker locale={locale} format={item.format} picker={item.mode}/>
            </Form.item>
        )
    }

    uploadElement = (item) => {
        const rules = this.rules(item)
        return (
            <Form.item label={item.label} name={item.name} key={item.name} rules={[...rules,{validator: this.validateComponents}]}>
                <UploadComponent name={item.name} request={item.request} initValue={this.props.formConfig.setFieldValue}/>
            </Form.item>
        )
    }

    editorElement = (item) => {
        const rules = this.rules(item)
        return (
            <Form.item label={item.label} name={item.name} key={item.name} rules={[...rules,{validator: this.validateComponents}]} >
                <EditorComponent name={item.name} initValue={this.props.formConfig.setFieldValue} />
            </Form.item>
        )
    }

    initFormItem = (item) => {
        const { formItem } = this.props
        if (!formItem || (formItem && formItem.length === 0)) {
            return false
        }
        const formItemList = []
        // map, filter, reduce 需要返回值 forEach不需要返回值
        formItem.forEach(item => {
            if (item.type === 'Input') {
                formItemList.push(this.inputElement(item));
            }
            if (item.type === 'Select') {
                formItemList.push(this.selectElement(item));
            }
            if (item.type === 'SelectComponent') {
                formItemList.push(this.selecComponenttElement(item));
            }
            if (item.type === 'InputNumber') {
                formItemList.push(this.inputNumberElement(item));
            }
            if (item.type === 'Radio') {
                formItemList.push(this.radioElement(item));
            }
            if (item.type === 'Slot') {
                formItemList.push(this.slotElement(item));
            }
            if (item.type === 'Column') {
                formItemList.push(this.columnElement(item));
            }
            if (item.type === 'Date') {
                formItemList.push(this.dateElement(item));
            }
            if (item.type === 'Upload') {
                formItemList.push(this.uploadElement(item));
            }
            if (item.type === 'Editor') {
                formItemList.push(this.editorElement(item));
            }
        })
        return formItemList
    }

    formatData = (value) => {
        
        // 请求的原始数据,深度拷贝
        const requestData = JSON.parse(JSON.stringify(value))
        console.log(value)

        const { formatFormKey, editKey, setFieldValue } = this.props.formConfig

        // const jsonKey = this.props.formConfig.formatFormKey
        const keyValue = requestData[formatFormKey]
        console.log(formatFormKey)
        console.log(keyValue)
        // 如果是json对象
        // == 匹配数据是否相等，=== 匹配数据及数据类型
        if (Object.prototype.toString.call(keyValue) === "[ object Object]") {
            console.log(keyValue)
            requestData[formatFormKey] = keyValue[formatFormKey]
        }

        // 判断是否存在"编辑"状态指定的key
        if (editKey) {
            requestData[editKey] = setFieldValue[editKey]
        }
        return requestData
    }

    // add edit
    onSubmit = (value) => {
        if (this.props.submit) {
            this.props.submit(value)
            return false
        }

        // const requestData = this.formatData(value)
        // return false
        const data = {
            url: requestUrl[this.props.formConfig.url],
            data: value
        }
        this.setState({
            loading: true
        })
        formSubmit(data).then(response => {
            message.info(response.message)
            this.setState({
                loading: false
            })
        }).catch(error => {
            this.setState({
                loading: false
            })
        })
    }

    render(){
        const { submitButton } = this.props
        return(
            <Form ref="form" onFinish={this.onSubmit} initialValues={{ status:true,number:0 }} {...this.props.formLayout}>
                { this.initFormItem() }
                {
                    submitButton ? 
                    <Form.Item ><Button loading={this.state.loading} htmlType="submit" type="primary" >确定</Button></Form.Item> : 
                    ""
                }
                {/* 接收插槽内容 */}
                { this.props.children }
                console.log({ this.props.children })
                
            </Form>
        )
    }
}

FormSearch.propTypes = {
    config: PropTypes.object,
    formConfig: PropTypes.object,
    submitButton: PropTypes.bool
}

FormSearch.defaultProps = {
    batchButton: false,
    formConfig: {
        
    },
    submitButton: true

}

export default FormComponent