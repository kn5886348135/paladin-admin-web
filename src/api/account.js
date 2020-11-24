import service from '../../src/utils/request';

export function Login(data){
    return service.request({
        url:'/login/',
        method: 'post',
        data
    })
}

export function GetSMS(data){
    return service.request({
        url:'/getSms/',
        method: 'post',
        data
    })
}

export function Regist(data){
    return service.request({
        url:'/register/',
        method: 'post',
        data
    })
}