import { message } from 'antd'
import axios from 'axios'
import { getToken,getUsername } from './cookies'

const service = axios.create({
    baseURL: process.env.REACT_APP_API,
    timeout: 10000
})

service.interceptors.request.use(function (config) {
    console.log(process.env.REACT_APP_API)
    const token = sessionStorage.getItem('adminToken')
    config.headers['token'] = getToken()
    config.headers['username'] = getUsername()
    return config
}, function (error) {
    return Promise.reject(error)
})

service.interceptors.response.use(function (response) {
    const data = response.data
    if (data.resCode !==0) {
        message.error(data.message)
        return Promise.reject(response)
    }else{
        return response
    }
}, function (error) {
    return Promise.reject(error.request)
})

export default service