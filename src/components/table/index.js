import React, { Component, Fragment } from 'react'
import { Table } from 'antd'
import { TableList } from '@api/common'
import requesturl from '@api/requesturl'

class TableComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            pageNumber:1,
            pageSize:10,
            keyword:'',
            tableLoading: false,
            data: [],
            tableLoading: false
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
            }
            this.setState({
                tableLoading: false
            }).catch(error => {
                this.setState({
                    tableLoading: true
                })
            })
        })
    }

    onCheckbox = (value) => {

    }
    render(h) {
        const { thead,checkbox,rowKey,tableLoading } = this.props.config
        const rowSelection = {
            onChange: this.onCheckbox
        }
        return (
            <Table rowKey={rowKey || "id"} columns={thead} dataSource={this.props.config.data} rowSelection={checkbox?checkbox:null} bordered loading={tableLoading}/>
        )
    }
}

export default TableComponent
