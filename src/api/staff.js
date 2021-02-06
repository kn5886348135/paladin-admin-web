import service from '../utils/request';

export function Add(data){
    return service.request({
        url:'/staff/add',
        method: 'post',
        data
    })
}

export function Detailed(data){
    return service.request({
        url:'/staff/detailed',
        method: 'post',
        data
    })
}

export function StaffEditApi(data){
    return service.request({
        url:'/staff/edit',
        method: 'post',
        data
    })
}