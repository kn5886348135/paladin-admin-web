// global config
import { setTokenKey, setUsernameKey } from '../Type'
import { getToken, getUsername } from '@/utils/cookies'

const app = {
    token: "" || getToken(),
    username: "" || getUsername()
}

const appReducer = function(state = app, action){
    switch(action.type){
        case setTokenKey: {
            return {
                ...state,
                token: action.value
            }
        }
        case setUsernameKey: {
            return {
                ...state,
                username: action.value
            }
        }
        default:
            return state
    }
    
}

export default appReducer