import React, { Component, Fragment } from 'react'
import { message, Select } from 'antd'
import {DepartmentAddApi,DepartmentDetailApi,DepartmentEditApi } from '../../api/department'
import FormComponent from '@c/form/index'
import SelectComponent from '../../components/select'
import requesturl from '../../api/requesturl'
import { requestData } from '../../api/common'

const { Option } = Select

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
            id: this.props.location.state ? this.props.location.state.id : "",
            select: {
                url: "getDepartmentList",
                propsKey: {
                    value: "id",
                    label: "name"
                },
                name: "parentId"
            },
            selectitem: [
                { value: 10,label: "研发部" },
                { value: 11,label: "行政部" }
            ],
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
            formItem: [
                { 
                    type: "Slot", 
                    label: '部门名称', 
                    name:'parentId', 
                    required: true, 
                    slotName: "department",
                    style: { width: '150px'},
                    placeholder: '请输入部门名称'
                },{ 
                    type: "SelectComponent", 
                    label: '部门名称', 
                    name:'parentId', 
                    required: true, 
                    url:"getDepartmentList",
                    param: {
                        value: "id",
                        label: "name"
                    },
                    options: [
                        {value: 760, label: "研发部"},
                        {value: 757, label: "行政部"}
                    ],
                    rules: [{}, {}],
                    style: { width: '150px'},
                    placeholder: '请输入部门名称'
                },
                { 
                    type: "InputNumber", 
                    label: '人员数量', 
                    name:'number', 
                    required: true, 
                    min: 0,
                    max: 100,
                    style: { width: '150px'},
                    placeholder: '请输入人员数量'
                },
                { 
                    type: "Radio", 
                    label: '禁启用', 
                    name:'status', 
                    required: true,
                    options: [
                        {label: '禁用',value: false},
                        {label: '启用',value: true}
                    ]
                },
                { 
                    type: "Select", 
                    label: '部门名称aaa', 
                    name:'nameaaa',
                    required: true, 
                    options: [
                        { label: '研发部', value: 'a'},
                        { label: '行政部', value: 'b'}
                    ],
                    style: { width: '150px'},
                    placeholder: '请选择部门'
                },
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

    componentDidMount(){
        // console.log(this.props.location.state.name)
        console.log(this.state.id)
        this.state.id && this.getDetail()
        this.getSelectList()
    }

    getDetail = () => {
        if (!this.props.location.state) {
            return false
        }
        DepartmentDetailApi(this.props.location.state.id).then(res=>{
            console.log(res)
            // const data = res.data.data

            this.setState({
                formConfig: {
                    ...this.state.formConfig,
                    setFieldValue: Response.data.data,
                    url: "jobEdit",
                    editKey: "jobId"
                }
            })
            // this.refs.form.setFieldsValue({
            //     content: data.content,
            //     name: data.name,
            //     number: data.number,
            //     status: data.status
            // })
            // this.refs.form.setFieldsValue(res.data.data){
            // }
        })
    }

    getSelectList = () => {
        const data = {
            url: requesturl["getDepartmentList"]
        }

        if (!data.url) {
            return false
        }
        requestData(data).then(res => {
            this.setState({
                select: res.data.data.data
            })
        })
    }

    onSubmit = (value) => {
        // 传入submit
        if (this.props.submit) {
            this.props.submit(value)
            return false
        }
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
                <SelectComponent url = {this.state.select.url} propsKey = {this.state.select.propsKey} name={this.state.props.name}/>
                <FormComponent formItem = {this.state.formItem} formLayout={this.state.formLayout} formConfig={this.state.formConfig}/>
                {/* <Form ref="form" onFinish={this.onSubmit} initialValues={{ status:true,number:0 }} {...this.state.formLayout}>
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
                </Form> */}
                {/* 插槽 */}
                <FormComponent formItem = {this.state.formItem} formLayout={this.state.formLayout} formConfig={this.state.formConfig} >
                    <Select  ref="department">
                        {
                           this.state.selectitem && this.state.selectitem.map(ele => {
                            return <Option value={ele.id } key={Number(ele.id)}>{ele.name}</Option>
                            })
                        }
                    </Select>
                    <div ref="divDom">sadgsdfweg</div>
                    <Select  ref="job">
                        {
                           this.state.selectitem && this.state.selectitem.map(ele => {
                            return <Option value={ele.id } key={Number(ele.id)}>{ele.name}</Option>
                            })
                        }
                    </Select>
                </FormComponent>

                {
                /**
                 * 1、插槽没有元素的情况，this.props.children 获取的是undefined
                 * 2、只有一个元素在情况，获取在就是一个object对象
                 * 3、多个的情况，获取的是一个Array数组对象
                 * */ }
            </Fragment>
        )
    }
}

export default DepartmentAddForm
