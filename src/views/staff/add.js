import React, { Component, Fragment } from 'react'
import { message, Select, Row, Col, Divider, Radio, DatePicker, Upload } from 'antd'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import {DepartmentAddApi,DepartmentDetailApi,DepartmentEditApi } from '../../api/department'
import FormComponent from '@c/form'
import SelectComponent from '../../components/select'
import requesturl from '../../api/requesturl'
import { requestData,upload } from '../../api/common'
import Item from 'antd/lib/list/Item'
import { nation } from '@/js/data'
import { validate_phone } from '@/utils/validate'
import { Editor } from '@tinymce/tinymce-react'

const { Option } = Select

class StaffAddForm extends Component {
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
            job_status: "",
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
                    type: "Column",
                    label: "个人信息"
                },
                { 
                    type: "Input", 
                    label: '姓名', 
                    name:'name', 
                    required: true, 
                    style: { width: '200px'},
                    placeholder: '请输入姓名',
                    rules: [
                        { min: 5,message: "不能小于5个字符"}
                    ]
                },{ 
                    type: "Radio", 
                    label: '性别', 
                    name:'sex', 
                    required: true, 
                    options: [
                        { label: "男", value: true},
                        { label: "女", value: false}
                    ],
                    rules: [{}, {}],
                    style: { width: '150px'},
                    placeholder: '请输入部门名称'
                },
                { 
                    type: "Input", 
                    label: '身份证', 
                    name:'cardId', 
                    required: true, 
                    style: { width: '200px'},
                    placeholder: '请输入身份证号'
                },
                { 
                    type: "Upload", 
                    label: '头像', 
                    name:'face', 
                    request: true,
                    required: true, 
                    style: { width: '200px'},
                    message: "请上传头像"
                },
                { 
                    type: "Upload", 
                    label: '毕业证', 
                    name:'diploma_img', 
                    required: true, 
                    style: { width: '200px'},
                    message: "请上传头像"
                },
                { 
                    type: "Date", 
                    label: '出生年月', 
                    name:'birthDay', 
                    format: "YYYYY/MM/DD",
                    mode: "month",
                    required: true,
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
                    type: "Select", 
                    label: '民族', 
                    name:'nation', 
                    required: true,
                    options: [
                        { label: "汉族", value: "hanzu"}
                    ],
                    placeholder: "请选择民族"
                },
                { 
                    type: "Select", 
                    label: '政治面貌', 
                    name:'political', 
                    required: true,
                    options: [
                        { label: "党员", value: "dangyuan"},
                        { label: "团员", value: "tuanyuan"},
                        { label: "群众", value: "qunzhong"},
                    ],
                    placeholder: "请选择政治面貌"
                },
                { 
                    type: "Input", 
                    label: '毕业院校', 
                    name:'school', 
                    required: true,
                    placeholder: "请输入毕业院校"
                },
                { 
                    type: "Select", 
                    label: '学历', 
                    name:'education', 
                    required: true,
                    placeholder: "请选择学历"
                },
                { 
                    type: "Input", 
                    label: '专业', 
                    name:'major', 
                    required: true,
                    placeholder: "输入专业"
                },
                { 
                    type: "Input", 
                    label: '微信号', 
                    name:'wechat', 
                    required: true,
                    placeholder: "请输入微信号"
                },
                { 
                    type: "Input", 
                    label: '邮箱', 
                    name:'email', 
                    required: true,
                    placeholder: "请输入邮箱"
                },
                {
                    type: "Column",
                    label: "就职信息"
                },{ 
                    type: "SelectComponent", 
                    url: "job/listAll",
                    propsKey: {
                        label: "jobName",
                        value: "jobId"
                    },
                    label: '职位', 
                    name:'job_id', 
                    required: true,
                    style: { width: "200px" },
                    placeholder: "请选择职位"
                },
                { 
                    type: "Slot", 
                    label: '职位状态', 
                    name:'job_status', 
                    required: true,
                    style: { width: "200px" },
                    placeholder: "请选择职位状态"
                },
                { 
                    type: "Input", 
                    label: '公司邮箱', 
                    name:'company_email', 
                    required: true,
                    style: { width: "200px" },
                    placeholder: "请输入公司邮箱"
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
                },
                { 
                    type: "Input", 
                    label: '描述', 
                    name:'description', 
                    required: true, 
                    placeholder: "请输入描述内容"
                },
                { 
                    type: "Editor", 
                    label: '描述', 
                    name:'description' ,
                    required: true,
                    placeholder: "请输入描述内容"
                }
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

    /** 获取富文本内容 */
    handleEditorChange = (value) => {
        console.log(value)
    }

    onChange = (e) => {
        console.log(e)
        this.setState({
            job_status: e.target.value
        })
    }

    render(h) {
        
        const editorObj={
            height:"800",
            language:"zh_CN",
            plugins:"table lists link image preview code",
            toolbar:"formatselect | code | preview | bold italic strikethrough forcecolor backcolor | link image | alignleft aligncenter alignright alignjustify",
            relative_urls: false,
            file_picker_types:"image",
            images_upload_url:"http",
            image_advtab: true,
            image_uploadtab: true,
            images_upload_handler: (blobInfo, success, failure) => {
                var formData;
                var file = blobInfo.blob();
                formData = new FormData()
                formData.append('file', file, file.name)
                upload(formData).then(response => {
                    console.log(response.data.data)
                    const data = response.data.data.url
                    success(data)
                }).catch(error => {
                    console.log(error)
                })
            },
        }
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
                    <div ref="jobStatus" style={{width: "500px"}}/>
                    <Radio.Group onChange={this.onChange} value={this.state.job_status} style={{width: "100%"}}>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <Radio value={"online"}>在职</Radio>
                                <DatePicker locale={locale} format="YYYY/MM/DD" />
                            </Col>
                            <Col className="gutter-row" span={4}>
                            <Radio value={"quit"}>离职</Radio>
                                <DatePicker locale={locale} format="YYYY/MM/DD" />
                            </Col>
                            <Col className="gutter-row" span={4}>
                                <Radio value={"vacation"}>休假</Radio>
                                <DatePicker locale={locale} format="YYYY/MM/DD" />
                            </Col>
                        </Row>
                    </Radio.Group>
                    <Select  ref="jobStatus">
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

                <Editor 
                    inline={false}
                    selector="editorStateRef"
                    apiKey="官网上申请在key值"
                    initialValue={"111"}
                    init={{...editorObj}}
                    onEditorChange={this.handleEditorChange}
                />
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

export default StaffAddForm
