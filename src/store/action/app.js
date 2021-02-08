import { setTokenKey, setUsernameKey, logout,router } from '../Type'
import { setToken, setUsername,removeToken,removeUsername } from '@/utils/cookies'
import Router from '../../router/router'
import { Login } from '../../api/account'

// global config

export function setTokenAction(params){
    console.log(params)
    setToken(params)
    return {
        type: setTokenKey,
        payload: params
    }
}

export function setUsernameAction(params){
    setUsername(params.username)
    return {
        type: setUsernameKey,
        payload: params
    }
}

export function logoutAction(){
    console.log(222)
    removeToken()
    removeUsername()
    return {
        type: logout,
        payload: ""
    }
}

export function updateRouter(data){
    return {
        type: router,
        value: data
    }
}

// 路由权限判断
export function hasPermission(role, router){
    if (router.role && router.role.length >0) {
        return role.some(element => router.role.indexOf(element) >= 0)
    }
}

export const accountLoginAction = (data) => dispatch => {
    return Login(data).then(res => {
        console.log(res)
        const role = res.data.data.role.split(",")
        const token = res.data.data.token
        const username = res.data.data.username

        let routerArray = []

        if (role.includes("admin")) {
            routerArray = Router
        }else{
            routerArray = Router.filter((item) => {
                console.log(item)
                if (hasPermission(role,item)) {
                    if (item.child && item.child.length>0) {
                        item.child = item.child.filter((child) => {
                            if (hasPermission(role,child)) {
                                return child
                            }
                            return false
                        })
                        return item
                    }
                    return item
                }
                return false
            })
        }

        console.log(routerArray)
        dispatch(setToken(token))
        dispatch(setUsername(username))
        dispatch(updateRouter(routerArray))
    }).catch(error => {

    })
}