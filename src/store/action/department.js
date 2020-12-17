import { addDepartmentLists, updateDepartmentLists } from '../Type'

export function addDepartmentList(params){
    console.log(params)
    return {
        type: addDepartmentLists,
        payload: params.data
    }
}

export function updateDepartmentList(params){
    console.log(params)
    return {
        type: updateDepartmentLists,
        payload: params.data
    }
}
