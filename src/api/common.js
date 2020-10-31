import service from '../../src/utils/request';

export function TableList(param){
    return service.request({
        url: param.url,
        method: param.method || 'post',
        data: param.data
    })
}

export function requestData(param){
    return service.request({
        url: param.url,
        method: param.method || 'post',
        data: param.data
    })
}