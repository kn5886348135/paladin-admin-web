import service from '../../src/utils/request';

export function DepartmentAddApi(data){
    return service.request({
        url:'/department/add',
        method: 'post',
        data
    })
}

export function DepartmentAddFormApi(data){
    return service.request({
        url:'/department/addform',
        method: 'post',
        data
    })
}

export function GetDepartmentListApi(data){
    return service.request({
        url:'/department/list',
        method: 'post',
        data
    })
}



export function DepartmentDeleteApi(data){
    return service.request({
        url:'/department/delete',
        method: 'post',
        data
    })
}

export function ChangeStatusApi(data){
    return service.request({
        url:'/department/status',
        method: 'post',
        data
    })
}

export function DepartmentDetailApi(data){
    return service.request({
        url:'/department/detailed',
        method: 'post',
        data
    })
}

export function DepartmentEditApi(data){
    return service.request({
        url:'/department/edit',
        method: 'post',
        data
    })
}