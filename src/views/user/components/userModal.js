import React, { Component } from 'react'
import { UserAdd, UserDetailed, UserEdit } from '@/api/user'
import { Checkbox, message, Modal } from 'antd'
import FormComponent from '@c/form/index'
import { validate_phone } from '@/utils/validate'
import CryptoJs from 'crypto-js'
import { validate_password } from '../../../utils/validate'
class UserModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            isModalVisible: false,
            user_id: "",
            role_options: [
                {label: "aa", value: 1},
                {label: "aa", value: 1}
            ],
            password_rules: [
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
            ],
            passwordconfirm_rules: [
                (getFieldValue) => ({
                    validator(rule, value) {
                        // getFieldValue 获取其它dom的值
                        console.log(value)
                        if (validate_password(value)) {
                            return Promise.reject("密码格式错误")
                        }
                        if (getFieldValue('password') !== value) {
                            return Promise.reject("两次密码不相同")
                        }
                        return Promise.resolve()
                    }
                })
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
                    value_type: "password",
                    label: '密码', 
                    uploadField: true,
                    name:'password', 
                    required: false, 
                    style: { width: '200px'},
                    placeholder: '请输入姓名',
                    rules: "",
                    blurEvent: true
                },
                { 
                    type: "Input", 
                    label: '确认密码',
                    value_type: "password",
                    uploadField: true, 
                    name:'passwords', 
                    required: false, 
                    style: { width: '200px'},
                    placeholder: '请输入姓名',
                    rules: "",
                    blurEvent: true
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
                    rules: ""
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

    onFormRef = (ref) => {
        this.child = ref
    }

    /** 修改数组对象
     * 当表单属性比较多的时候会影响性能，可以使用antd的Form的shouldUpdate，通过增量
     * 更新的方式，只更新被修改的相关组件以达到性能优化的上的
     */
    updateArrayItem = (index, key) => {
        this.setState({
            // formItem: this.state.formItem.map((item, _index) => _index === index ? {...item,[key]: value} : item)
            // formItem: this.state.formItem.map((item, _index) => index.includes(index) ? {...item,[key]: value} : item)
            // formItem: this.state.formItem.map((item, _index) => index.includes(index) ? {...item, ...key} : item)
            formItem: this.state.formItem.map((item, _index) => index.includes(index) ? {...item, ...key[_index]} : item)
        })
    }

     /** 修改数组对象 */
     updateItem = (id) => {
         const bool = id ? false : true
        // this.updateArrayItem(1,"required",id ? false : true)
        // this.updateArrayItem([1,2],"required",id ? false : true)
        //  this.updateArrayItem([1,2],{required: id ? false : true,rules: "111"})
        // 编辑的时候不校验？比较好的做法是修改密码单独做一个功能，或者校验成功才修改密码
        this.updateArrayItem(
            [1,2],
            {
                1 : {
                    // required: id ? false : true,
                    rules: id ? "" : this.state.password_rules
                },
                2 : {
                    // required: id ? false : true,
                    rules: id ? "" : this.state.passwordconfirm_rules
                }

            }
        )

        this.setState({
            formItem: ""
        })
    }

    visibleModal = (params) => {
        this.setState({
            isModalVisible: params.status,
            user_id: params.user_id
        }, () => {
            this.getDetailed()
            this.updateItem(params.user_id)
            console.log(this.state)
        })
    }

    getDetailed = () => {
        if (!this.state.user_id) {
            return false
        }
        // 获取详细信息时，密码是不能展示的
        // 只有新增的时候才必须填写密码，修改的时候不展示密码，也不修改，不验证
        UserDetailed({id: this.state.user_id}).then(res => {
            console.log(res)
            this.setState({
                formConfig: {
                    setFieldValue: res.data.data
                }
            })
        })
    }

    handleOk = () => {

    }

    onBlurEvent = (e) => {
        const value = e.currentTarget.value
        if (value) {
            this.updateItem(value ? false: true)
        }
        // if (e.currentTarget.id === 'password' && this.state.user_id) {
        //     this.updateArrayItem([1], { 1: {rules: ""}})
        // }
        // if (e.currentTarget.id === 'passwordconfirm' && this.state.user_id) {
        //     this.updateArrayItem([2], { 2: {rules: ""}})
        // }
    }

    handleCancel = () => {
        this.child.onReset()
        this.visibleModal(false)
    }

    submit = (value) => {
        const requestData = value
        requestData.password = CryptoJs.MD5(value.password).toString()
        delete requestData.password
        UserAdd(requestData).then(res => {
            const responseData = res.data
            message.info(res.message)
            this.handleCancel(false)
        })
    }

    handlerFormAdd = (value) => {
        const requestData = value
        requestData.password = CryptoJs.MD5(value.password).toString()
        
        delete requestData.password
        UserAdd(requestData).then(res => {
            const resData = res.data
            message.info(resData.message)
            this.handleCancel(false)
        })
    }

    handlerFormEdit = (value) => {
        
        const password = value.password
        const passwordconfirm = value.passwordconfirm

        if (password) {
            if (!validate_password(password)) {
                message.info("请输入6-20位的英文和数字的密码")
                return false
            }
        }

        if (!passwordconfirm) {
            if (!validate_password(passwordconfirm)) {
                message.info("请输入6-20位的英文和数字的确认密码密码")
                return false
            }
        }

        if ((password && passwordconfirm) || (password && !passwordconfirm) || (!password && passwordconfirm)) {
            if (password !== passwordconfirm) {
                message.info("两次密码不一致")
                return false
            }
        }

        const requestData = value
        requestData.id = this.state.user_id
        if (requestData.password) {
            requestData.password = CryptoJs.MD5(value.password).toString()
            delete requestData.passwordconfirm
        }

        // 提交前验证密码，不再是输入的时候验证，交互体验的取舍问题
        return false
        delete requestData.password
        UserEdit(requestData).then(res => {
            const resData = res.data
            message.info(resData.message)
            this.handleCancel(false)
        })
    }

    onChangeRole = (value) => {
        console.log(value)
    }

    render(){
        return (
            <Modal title="新增用户" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                <FormComponent onRef={this.onFormRef} onBlur={this.onBlurEvent} formItem={this.state.formItem} formLayout={this.state.formLayout} formConfig={this.state.formConfig} submit={this.onHandlerSubmit} submitButton={false}/>
                <div ref="role">
                    <Checkbox.Group 
                        options={this.state.role_options}
                        defaultValue={['Apple']}
                        onChange={this.onChangeRole}
                    />
                </div>
            </Modal>
        )
    }
}

export default UserModal