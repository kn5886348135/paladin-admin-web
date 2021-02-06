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

/**
 * common form submit
 * 
 * @param {*} param 
 */
export function formSubmit(param){
    return service.request({
        url: param.url,
        method: param.method || 'post',
        data: param.data
    })
}

/**
 * tinymce图片上传
 */
export function upload(param){
    return service.request({
        url: '/upload',
        method:  'post',
        data: param.data
    })
}