import cookies from 'react-cookies'

const adminToken = "adminToken"
const username = 'username'
export function setToken(value){
    cookies.save(adminToken, value)
}

export function getToken(){
    // return cookies.load(adminToken)
    //  随机 登录跳转
    return "sddddddsdga"
}

export function setUsername(value){
    cookies.save(username,value)
}

export function getUsername(value){
    return cookies.load(username)
}

export function removeToken(){
    cookies.remove(adminToken, { path: "/"})
}

export function removeUsername(){
    cookies.remove(username, { path: "/"})
}