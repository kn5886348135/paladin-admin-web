export const reg_password = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
const reg_email = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/

export const validatePassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/

export function validate_email(value){
    console.log(value+'validate_email')
    console.log(reg_email.test(value))
    return reg_email.test(value)
}

export function validate_password(value){
    return reg_password.test(value)
}