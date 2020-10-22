import service from '../../src/utils/request';

export function DepartmentAddApi(data){
    return service.request({
        url:'/department/add',
        method: 'post',
        data
    })
}

export function DepartmentListApi(data){
    return service.request({
        url:'/department/list',
        method: 'post',
        data
    })
}
