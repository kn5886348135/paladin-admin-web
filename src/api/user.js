import service from '../utils/request';

export function UserAdd(data){
    return service.request({
        url:'/user/add',
        method: 'post',
        data
    })
}

export function UserDetailed(data){
    return service.request({
        url:'/user/detailed',
        method: 'post',
        data
    })
}

export function UserEdit(data){
    return service.request({
        url:'/user/edit',
        method: 'post',
        data
    })
}