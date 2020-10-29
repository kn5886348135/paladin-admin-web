import React, { Component, Fragment } from 'react'
import { Form, Input,Button, InputNumber, Radio, message } from 'antd'
import {DepartmentAddApi,DepartmentDetailApi,DepartmentEditApi } from '../../api/department'
import FormComponent from '@c/form/index'

class DepartmentAddForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            formLayout:{
                labelCol: {span: 2 },
                wrapperCol: {span: 20}
            },
            value: true,
            loading: false,
            id:"",
            formItem: [
                { type: "Input", label: '部门名称', name:'name', required: true, rules: [{}, {}]},
                { type: "Select", label: '部门名称aaa', name:'nameaaa',rules: [
                    { required: true, message: '部门名称不能为空'}
                ]},
            ]
        }
    }

    componentWillMount(){
        if (!this.props.location.state) {
            return false
        }
        this.setState({
            id: this.props.location.state.id
        })
        console.log(this.props.location.state.id)
    }

    componentWillMount(){
        // const id = this.props.location.state.id
        // if (this.props.location.state.id) {
        //     this.setState({
        //         id:id
        //     })
        // }
    }

    componentDidMount(){
        // console.log(this.props.location.state.name)
        console.log(this.state.id)
        this.getDetail()
    }

    getDetail = () => {
        if (!this.props.location.state) {
            return false
        }
        DepartmentDetailApi(this.props.location.state.id).then(res=>{
            console.log(res)
            const data = res.data.data

            this.refs.form.setFieldsValue({
                content: data.content,
                name: data.name,
                number: data.number,
                status: data.status
            })
            // this.refs.form.setFieldsValue(res.data.data){
            // }
        })
    }
    onSubmit = (value) => {
        console.log(value)
        if(!value.name){
            message.error("部门名称不能为空")
            return false
        }
        if(!value.name || value.number === 0){
            message.error("人员数量不能为空")
            return false
        }
        if(!value.content){
            message.error("描述不能为空")
            return false
        }
        this.setState({
            loading: true
        })
        this.state.id ? this.onHandlerEdit(value) :this.onHandlerAdd(value)
    }

    onHandlerAdd = (value) => {
        DepartmentAddApi(value).then(res => {
            console.log(res)
            message.info(res.data.message)
            this.setState({
                loading: false
            })
            this.refs.form.resetFields()
        }, (error => {
                console.log(error.request)
                this.setState({
                    loading: false
                })
        })).catch()
    }

    onHandlerEdit = (value) => {
        const requestData = value
        requestData.id = this.state.id

        DepartmentEditApi(requestData).then(res => {
            console.log(res)
            message.info(res.data.message)
            this.setState({
                loading: false
            })
            this.refs.form.resetFields()
        }, (error => {
                console.log(error.request)
                this.setState({
                    loading: false
                })
        })).catch()
    }

    render(h) {
        
        return (
            <Fragment>
                <FormComponent formItem = {this.state.formItem} />
                <Form ref="form" onFinish={this.onSubmit} initialValues={{ status:true,number:0 }} {...this.state.formLayout}>
                    <Form.Item label="部门名称" name="name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="人员数量" name="number">
                        <InputNumber initialValues={0} min={0} max={200}/>
                    </Form.Item>
                    <Form.Item label="禁启用" name="status">
                        <Radio.Group initialValues={true} value={this.state.value}>
                            <Radio value={false}>禁用</Radio>
                            <Radio value={true}>启用</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="描述" name="content">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item >
                        <Button loading={this.state.loading} htmlType="submit" type="primary" >确定</Button>
                    </Form.Item>
                </Form>
            </Fragment>
        )
    }
}

export default DepartmentAddForm
