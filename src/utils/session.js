const adminToken = "adminToken"

export function setToken(value){
    sessionStorage.setItem(adminToken, value)
}

export function getToken(){
    return sessionStorage.getItem(adminToken)
}