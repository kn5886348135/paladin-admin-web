import React, { Component, Fragment } from 'react';
import { Form, Input, Button, Table } from 'antd'

class DepartmentList extends Component {
    constructor(props){
        super(props)
        this.state = {
            columns: [
                {
                title:'部门名称',dataIndex:'name',key:'name'
            },{
                title:'禁启用',dataIndex:'status',key:'status'
            },{
                title:'人员数量',dataIndex:'number',key:'number'
            },{
                title:'描述',dataIndex:'conetnt',key:'conetnt'
            },{
                title:'操作',dataIndex:'operation',key:'operation',width:'200px'
            }
        ],
        data:[{
            key: '1',
            name: '胡彦斌',
            number: 32,
            status: true
          },
          {
            key: '2',
            name: '胡彦祖',
            number: 42,
            status: true
          }]
        }
    }

    search = (value) => {
        console.log(value)
    }
    render(h) {
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
                <Table columns={this.state.columns} dataSource={this.state.data} bordered></Table>
            </Fragment>
        )
    }
}

export default DepartmentList
