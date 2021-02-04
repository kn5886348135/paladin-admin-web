const requesturl = {
    // department
    'departmentList':'/department/list',                 // 列表
    'getDepartmentList':'/department/departmentList',    // 列表 不带分页
    'departmentListDelete':'/department/delete/',        // 删除
    'departmentAdd':'/department/add',                   // 添加
    'departmentEdit':'/department/edit',                 // 编辑
    // job
    'jobList':'/job/list',                 // 列表
    'jobListDelete':'/job/delete/',        // 删除
    'jobAdd':'/job/add',                   // 添加
    'jobEdit':'/job/edit',                 // 编辑
}

export default requesturl

/**
 * 添加职位
 * jobName: ""
 * status: ""
 * content: ""
 * parentId: ""
 */