import service from '../../src/utils/request';

export function DepartmentAddApi(data){
    return service.request({
        url:'/department/add',
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