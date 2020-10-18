import axios from 'axios'

const service = axios.create({
    baseURL: process.env.REACT_APP_API,
    timeout: 10000
})

service.interceptors.request.use(function (config) {
    console.log(process.env.REACT_APP_API)
    return config
}, function (error) {
    return Promise.reject(error)
})

service.interceptors.response.use(function (response) {
    return response
}, function (error) {
    return Promise.reject(error)
})

export default service