import { addDepartmentLists } from '../Type'

const stateData = {
    departmentList: []
}


// department config
const departmentReducer = function(state = stateData, action) {
    console.log(action)
    switch (action.type) {
        case addDepartmentLists: {
            return {
                ...state,
                departmentList: action.data
            }
            
        }
    
        default:
            return state
    }
}

export default departmentReducer