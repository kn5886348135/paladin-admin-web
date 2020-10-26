import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import { Form, Input, Button, Table, Switch, message, Modal } from 'antd'
import { GetDepartmentListApi, DepartmentDeleteApi,ChangeStatusApi } from '@api/department'

class DepartmentList extends Component {
    constructor(props){
        super(props)
        this.state = {
            columns: [
                {
                title:'部门名称',dataIndex:'name',key:'name'
            },{
                title:'禁启用',dataIndex:'status',key:'status',render: (text, rowData) => {
                    return <Switch onChange={() => {this.onHandlerSwitch(rowData)}} loading={this.state.switchId === rowData.id ? true : false} checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={ rowData.status === 1 ? true : false } />
                }
            },{
                title:'人员数量',dataIndex:'number',key:'number'
            },{
                title:'描述',dataIndex:'conetnt',key:'conetnt'
            },{
                title:'操作',dataIndex:'operation',key:'operation',width:'200px',render: (text, rowData) => {
                    return (
                        <div className="inline-button">
                            <Button onClick={() => this.onHandlerEdit(rowData)} type="primary">
                                <Link to={{ pathname:"/index/department/edit",query:{id:rowData.id}}}>编辑</Link>
                                {/* <Link to={'/index/department/edit?id=' + rowData.id}>编辑</Link> */}
                            </Button>
                            <Button onClick={() => this.onHandlerDelete(rowData)} type="primary">删除</Button>
                        </div>
                    )
                }
            }
        ],
        /*
        react路由传参3种方式
        params传参(刷新页面后参数不消失，参数会在地址栏显示)
        路由页面 <Route path='/link/:id' component={Demo}></Route> 需要配置 /:id 路由跳转并传递参数
        链接方式 <Link to={'/link/'+'xxx'}>首页</Link> 或者 <Link to={{pathname:'/link/'+'xxx'}>首页</Link>
        js方式 this.props.history.push('/link/'+'xxx') 或者 this.props.history.push({pathname:'/link'+'xxx'})
        获取参数 this.props.match.params.id 使用match而不是history

        query传参(刷新页面后参数消失)
        路由页面 <Route path='/demo' component={Demo}></Route> 无需配置 路由跳转并传递参数
        链接方式 <Link to={{pathname:'/link/',query:{id:22,name:'dahuang'}}}>XX</Link>
        js方式 this.props.history.push({pathname:'/link/',query:{id:22,name:'dahuang'}}) 
        获取参数 this.props.location.query.name

        state传参(刷新页面后参数不消失，state穿的参数是加密的)
        路由页面 <Route path='/demo' component={Demo}></Route> 无需配置 路由跳转并传递参数
        链接方式 <Link to={{pathname:'/link/',state:{id:22,name:'dahuang'}}}>XX</Link>
        js方式 this.props.history.push({pathname:'/link/',state:{id:22,name:'dahuang'}}) 
        获取参数 this.props.location.state.name
        */
        data:[],
          pageNumber:1,
          pageSize:10,
          keyword:'',
          selectedRowKeys:[],
          visible: false,
          id:'',
          confirmLoading: false,
          switchId:'',
          taleLoading: false,
          searchLoading: false
        }
    }

    search = (value) => {
        this.setState({
            keyword:value.name,
            pageNumber:1,
            pageSize:10
        })
        this.setState({
            searchLoading: true
        })
        this.loadData()
        this.setState({
            searchLoading: false
        })
        console.log(value)
    }

    componentDidMount(){
        this.loadData()
    }

    loadData = () => {
        const { pageNumber, pageSize, keyword } = this.state
        const param = {
            pageNumber: pageNumber,
            pageSize: pageSize
        }
        if (keyword) {
            param.name=keyword
        }
        this.setState({
            taleLoading: true
        })
        GetDepartmentListApi().then(res => {
            console.log(res)
            const data = res.data
            if (data.resCode === 0) {
            }
            this.setState({
                taleLoading: false
            }).catch(error => {
                this.setState({
                    taleLoading: true
                })
            })
        })
    }

    onHandlerDelete(id){
        if (!id) {
            // id为空进行批量删除，比较建议批量删除单独写一个方法
            if (this.state.selectedRowKeys.length === 0) {
                message.info('请勾选数据')
                return false
            }
            id = this.state.selectedRowKeys.join()
            return false
        }
        this.setState({
            visible: true,
            id:id
        })
        DepartmentDeleteApi().then(res => {
            console.log(res)
            message.info(res.data.message)
            this.loadData()
        })
    }

    onHandlerSwitch(data){
        if (!data.status) {
            return false
        }
        // 使用组件属性控制连续点击，或者自定义一个flag开关值
        this.setState({
            switchId: data.id
        })
        const requestData = {
            id: data.id,
            status: data.id === '1' ? true : false
        }
        ChangeStatusApi(data).then(res => {
            message.info(res.data.message)
            this.loadData()
            this.setState({
                switchId: data.id
            })
        }).catch(error => {
            this.setState({
                switchId: data.id
            })
        })
    }
    onCheckbox = (selectedRowKeys) => {
        this.setState({
            selectedRowKeys: selectedRowKeys
        })
    }

    modalThen = () => {
        // 防止多次触发
        this.setState({
            confirmLoading: true
        })
        DepartmentDeleteApi({id: this.state.id}).then(res => {
            message.info(res.data.message)
            this.setState({
                visible: false,
                id:'',
                confirmLoading: false
            })
            this.loadData()
        })
    }


    render(h) {
        const { columns, data, taleLoading, searchLoading } = this.state
        const rowSelection = {
            onChange: this.onCheckbox
        }
        return (
            <Fragment>
                <Form layout="inline" onFinish={this.search}>
                    <Form.Item
                        name="name"
                        label="部门名称"
                        rules={[{required: false, message:'请输入部门名称'}]}>
                            <Input placeholder='部门名称'/>
                    </Form.Item>
                    <Form.Item>
                        <Button loading={searchLoading} type="primary" htmlType="submit">搜索</Button>
                    </Form.Item>
                    <Form.Item></Form.Item>
                    <Form.Item></Form.Item>
                </Form>
                <div className="table-wrap">
                    <Table loading={taleLoading} rowSelection={rowSelection} rowKey="id" columns={columns} dataSource={data} bordered></Table>
                     <Button onClick={() => this.onHandlerDelete()}>批量删除</Button>
                </div>
                <Modal
                    title="提示"
                    visible={this.state.visible}
                    onOk={this.hideModal}
                    onCancel={() => {
                        this.setState({
                            visible: false
                        })
                    }}
                    okText="确认"
                    cancelText="取消"
                    confirmLoading={this.state.confirmLoading}
                >
                <p className="text-center">确定删除此信息？<strong className="color-red">删除后将无法恢复</strong></p>
                </Modal>
            </Fragment>
        )
    }
}

export default DepartmentList
