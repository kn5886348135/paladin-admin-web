import React, { Component, Fragment } from 'react'
import { Pagination, Table, Row, Col, Button } from 'antd'
import { TableList } from '@api/common'
import requesturl from '@api/requesturl'
import PropTypes from 'prop-types'

class TableComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            pageNumber:1,
            pageSize:10,
            keyword:'',
            tableLoading: false,
            data: [],
            tableLoading: false,
            total:50
        }
    }

    componentDidMount(){
        this.loadData()
    }

    loadData = () => {
        const { pageNumber, pageSize, keyword} = this.state
        // const param = {
        //     pageNumber: pageNumber,
        //     pageSize: pageSize
        // }
        // if (keyword) {
        //     param.name = keyword
        // }
        // this.setState({
        //     tableLoading: true
        // })
        
        const param = {
            url: this.props.config.url,
            method: this.props.config.method,
            data: {
                pageNumber: pageNumber,
                pageSize: pageSize
            }
            
        }
        param.url =requesturl[this.props.config.url]



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
        const { thead,checkbox,rowKey,tableLoading,batchButton } = this.props.config
        const rowSelection = {
            onChange: this.onCheckbox
        }
        return (
            <Fragment>
                <Table pagination={false} rowKey={rowKey || "id"} columns={thead} dataSource={this.props.config.data} rowSelection={checkbox?checkbox:null} bordered loading={tableLoading}/>
                <Row>
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
                </Row>
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
