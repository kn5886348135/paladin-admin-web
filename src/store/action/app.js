import { setTokenKey, setUsernameKey } from '../Type'
import { setToken, setUsername } from '@/utils/cookies'

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