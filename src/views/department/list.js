import React, { Component, Fragment } from 'react';
import { Form, Input, Button, Table, Switch, message } from 'antd'
import { GetDepartmentListApi, DepartmentDeleteApi } from '@api/department'

class DepartmentList extends Component {
    constructor(props){
        super(props)
        this.state = {
            columns: [
                {
                title:'部门名称',dataIndex:'name',key:'name'
            },{
                title:'禁启用',dataIndex:'status',key:'status',render: (text, rowData) => {
                    return <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={ rowData.status === 1 ? true : false } />
                }
            },{
                title:'人员数量',dataIndex:'number',key:'number'
            },{
                title:'描述',dataIndex:'conetnt',key:'conetnt'
            },{
                title:'操作',dataIndex:'operation',key:'operation',width:'200px',render: (text, rowData) => {
                    return (
                        <div className="inline-button">
                            <Button type="primary">编辑</Button>
                            <Button onClick={() => this.onHandlerDelete} type="primary">删除</Button>
                        </div>
                    )
                }
            }
        ],
        data:[],
          pageNumber:1,
          pageSize:10,
          keyword:'',
          selectedRowKeys:[]
        }
    }

    search = (value) => {
        this.setState({
            keyword:value.name,
            pageNumber:1,
            pageSize:10
        })
        this.loadData()
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
        GetDepartmentListApi().then(res => {
            console.log(res)
            const data = res.data
            if (data.resCode === 0) {
                
            }
        })
    }

    onHandlerDelete = (id) => {
        if (!id) {
            return false
        }
        DepartmentDeleteApi().then(res => {
            console.log(res)
            message.info(res.data.message)
            this.loadData()
        })
        
    }
    onCheckbox = (selectedRowKeys) => {
        this.setState({
            selectedRowKeys: selectedRowKeys
        })
    }
    render(h) {
        const { columns, data } = this.state
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
                        <Button type="primary" htmlType="submit">搜索</Button>
                    </Form.Item>
                    <Form.Item></Form.Item>
                    <Form.Item></Form.Item>
                </Form>
                <div className="table-wrap">
                <Table rowSelection={rowSelection} rowKey="id" columns={columns} dataSource={data} bordered></Table>
                </div>
                
            </Fragment>
        )
    }
}

export default DepartmentList
