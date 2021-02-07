import React, { Fragment } from 'react';
import TableComponent from '../../components/table';
import { Button, message } from 'antd'
import UserModal from './components/userModal'
class User extends React.Component{
    constructor(){
        super()
        this.state ={
            id: "",
            flag: false,
            pageNumber: 1,
            pageSize: 10,
            keyWork: "",
            tableConfig: {
                url: "userList",
                checkbox: true,
                thead: [
                    {
                        title: "姓名",
                        dataIndex: "full_name",
                        key: "full_name"
                    },
                    {
                        title: "职位名称",
                        dataIndex: "jobName",
                        key: "jobName"
                    },
                    {
                        title: "部门名称",
                        dataIndex: "name",
                        key: "name"
                    },
                    {
                        title: "入职日期",
                        dataIndex: "job_entry_date",
                        key: "job_entry_date"
                    }
                ],
                formItem: [
                    {
                        type: "Input",
                        label: "部门名称",
                        name: "name",
                        placeholder: "请输入部门名称"
                    },
                    {
                        type: "Select",
                        label: "禁启用",
                        name: "status",
                        placeholder: "请选择",
                        style: { width: "100px"},
                        optionsKey: "status"
                    }
                ],
                formSearchCol: 18,
                formSearchRight: 6
            },

            
        }
    }

    componentDidMount(){}

    // 存储子组件
    getChildRef = (ref) => {
        this.tableComponent = ref
    }

    // 获取弹窗子组件
    getUserModalRef = (ref) => {
        this.child = ref
    }

    userModal = () => {
        this.child.visibleModal(true)
    }
    
    onHandlerSwitch(data){
        if (this.state.flag) {
            return false
        }
        const requestData = {
            id: data.staff_id,
            status: !data.status
        }
        // 第一种做法，用组件本身异步
        this.setState({
            id: data.staff_id
        })
        // 第二种做法，自己做的开关
        // this.setState({flag: true})
        // Status(requestData).then(res => {
        //     message.info(res.data.message)
        //     this.setState({
        //         id: ""
        //     })
        // }).catch(error => {
        //     this.setState({id: ""})
        // })
    }

    delete = (id) => {
        this.tableComponent.onHandlerDelete(id)
    }

    render(){
        return(
            <Fragment>
                <TableComponent onRef={this.getChildRef} batchButton={true} config={this.state.tableConfig}>
                    <Button type="primary" ref="userAdd" onClick={this.userModal}>新增用户</Button>
                    {/* 新增用户弹出模态框 */}

                </TableComponent>
                <UserModal onRef={this.getUserModalRef}/>
            </Fragment>
        )
    }
}

export default User