import React, { Component, Fragment } from 'react'
import { Form, Input, message, Modal, Pagination, Table, Row, Col, Button } from 'antd'
import { TableList } from '@api/common'
import requesturl from '@api/requesturl'
import PropTypes from 'prop-types'
import TableBasic from './Table'
import FormSearch from "../formSearch"

class TableComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            pageNumber:1,
            pageSize:10,
            keyword:'',
            searchData: {},
            tableLoading: false,
            data: [],
            tableLoading: false,
            total:50,
            searchLoading: false
        }
    }

    componentDidMount(){
        this.loadData()
    }

    loadData = (data) => {
        const { pageNumber, pageSize, searchData } = this.state
        
        const param = {
            // url: requestUrl[this.props.config.url],
            url: this.props.config.url,
            method: this.props.config.method,
            data: {
                pageNumber: pageNumber,
                pageSize: pageSize
            }
            
        }

        console.log(searchData)
        param.url =requesturl[this.props.config.url]
        if(keyword){
            param.data.name = keyword
        }

        if (JSON.stringify(searchData) !== "{}") {
            console.log(searchData)
        }

        TableList(param).then(res => {
            console.log(res)
            const data = res.data
            if (data.resCode === 0) {
                this.setState({
                    data: data.data,
                    total: data.total
                })
            }
            this.setState({
                tableLoading: false
            })
            }).catch(error => {
                this.setState({
                    tableLoading: true
                })
            })
    }

    search = (value)  => {
        // reset pageNo
        this.setState({
            pageNumber: 1,
            pageSize: 10,
            searchData: value
        },() => {
            this.loadData();
        })
        console.log(value)
    }

    onHandlerDelete = () => {
        // if (!id) {
        //     // id为空进行批量删除，比较建议批量删除单独写一个方法
        //     if (this.state.selectedRowKeys.length === 0) {
        //         message.info('请勾选数据')
        //         return false
        //     }
        //     id = this.state.selectedRowKeys.join()
        //     return false
        // }
        // this.setState({
        //     visible: true,
        //     id:id
        // })
        // DepartmentDeleteApi().then(res => {
        //     console.log(res)
        //     message.info(res.data.message)
        //     this.setState({
        //         visible: false,
        //         id:'',
        //         confirmLoading: false,
        //         selectedRowKeys:[]
        //     })
        //     this.loadData()
        // }) 
    }

    onCheckbox = (value) => {

    }

    // search = (value) => {
    //     this.setState({
    //         keyword:value.name,
    //         pageNumber:1,
    //         pageSize:10
    //     })
    //     this.setState({
    //         searchLoading: true
    //     })
    //     this.loadData()
    //     this.setState({
    //         searchLoading: false
    //     })
    //     console.log(value)
    //     this.loadData()
    // }

    onChangeCurrentPage = (value) => {
        // setState的第二个参数保证state的数据修改后可以立马生效
        // state的同步机制
        this.setState({
            pageNumber: value
        }, () => {
            this.loadData()
        })
        
    }

    onShowSizeChanger = (value, page) => {
        this.setState({
            pageNumber: 1,
            pageSize: value
        }, () => {
            this.loadData()
        })
    }

    render(h) {
        const { thead, checkbox, rowKey, rowSelection, searchLoading, formItem } = this.props.config
        // const rowSelection = {
        //     onChange: this.onCheckbox
        // }
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
                <FormSearch formItem={formItem} search={this.search} />
                <div className="table-wrap">
                    <TableBasic 
                        columns={thead} 
                        dataSource={this.props.config.data}
                        total={this.state.total}
                        changePageCurrent={this.onChangeCurrentPage}
                        changePageSize={this.onShowSizeChange}
                        batchButton={false}
                        handlerDelete={() => this.onHandlerDelete()}
                        rowSelection={checkbox ? rowSelection : null}
                        rowKey={rowKey}
                        />
                </div>
                {/* <Table pagination={false} rowKey={rowKey || "id"} columns={thead} dataSource={this.props.config.data} rowSelection={checkbox?checkbox:null} bordered loading={tableLoading}/> */}
                {/* <div className="spacing-30"></div> */}
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
                {/* <Row>
                    <Col span={8}>
                        { this.props.batchButton &&<Button onClick={() => this.onHandlerDelete()}>批量删除</Button>}
                    </Col>
                    <Col span={16}>
                        <Pagination 
                            defaultCurrent={1}
                            onChange={this.onChangeCurrentPage}
                            className="pull-right"
                            total={this.state.total}
                            showSizeChanger
                            onShowSizeChange={this.onShowSizeChange}
                            showQuickJumper
                            showTotal={total => `Total ${total} items`} />
                    </Col>
                </Row> */}
            </Fragment>
        )
    }
}

TableComponent.propTypes = {
    config: PropTypes.object
}

TableComponent.defaultProps = {
    batchButton: false
}
export default TableComponent
