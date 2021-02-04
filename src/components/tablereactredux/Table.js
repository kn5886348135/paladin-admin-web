import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'
import { Table, Pagination, Row, Col, Button } from 'antd'
class TableBasic extends Component{
    
    render(){
        // const { thead, dataSource, checkbox,rowKey,tableLoading,batchButton,total,changeCurrentPage, showSizeChange, handlerDelete } = this.props
        const { thead } = this.props.config
        // const rowSelection = {
        //     onChange: this.onCheckbox
        // }

        
        return(
            <Fragment>
                <Table rowKey={this.props.rowKey} columns={thead} bordered />
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
    config: PropTypes.object,
    rowKey: PropTypes.string
}

TableBasic.defaultProps = {
    config: {},
    rowKey: "id"
}

const mapStateToProps = (state) => {
    
    console.log(state.departmentList)
    return {
        list: state.department.departmentList
    }
}

export default connect(
    mapStateToProps,
    null
)(TableBasic);