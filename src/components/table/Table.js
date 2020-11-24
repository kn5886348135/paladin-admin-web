import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'
import { Table, Pagination, Row, Col, Button } from 'antd'
class TableBasic extends Component{
    constructor(){
        super()
    }
    render(){
        const { thead, dataSource, checkbox,rowKey,tableLoading,batchButton,total,changeCurrentPage, showSizeChange, handlerDelete } = this.props
        // const rowSelection = {
        //     onChange: this.onCheckbox
        // }

        return(
            <Fragment>
                <Table pagination={false} rowKey={rowKey || "id"} columns={thead} dataSource={dataSource} rowSelection={checkbox?checkbox:null} bordered loading={tableLoading}/>
                <div className="spacing-30"></div>
                <Row>
                    <Col span={8}>
                        { batchButton &&<Button onClick={handlerDelete}>批量删除</Button>}
                    </Col>
                    <Col span={16}>
                        <Pagination 
                            defaultCurrent={1}
                            onChange={changeCurrentPage}
                            className="pull-right"
                            total={total}
                            showSizeChanger
                            onShowSizeChange={showSizeChange}
                            showQuickJumper
                            showTotal={total => `Total ${total} items`} />
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

TableBasic.propTypes = {
    columns: PropTypes.array,
    dataSource: PropTypes.array,
    total: PropTypes.number,
    changePageCurrent: PropTypes.func, 
    changePageSize: PropTypes.func,
    batchButton: PropTypes.bool,
    rowSelection: PropTypes.object,
    rowKey: PropTypes.string
}

TableBasic.defaultProps = {
    columns: [],
    dataSource: [],
    total: 0,
    batchButton: true,
    rowSelection: {},
    rowKey: 'id'
}

export default TableBasic