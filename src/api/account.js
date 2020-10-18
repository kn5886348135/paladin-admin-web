import service from '../../src/utils/request';

export function Login(data){
    return service.request({
        url:'/login/',
        method: 'post',
        data: data
    })
}