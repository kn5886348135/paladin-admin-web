import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import requestUrl from "@api/requesturl"
import { requestData } from '@api/common'

const { Option } = Select

class SelectComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            props:props.param,
            options: [
                { value: 760, label: "研发部"},
                { value: 757, label: "行政部"}
            ]
        }
        console.log(props)
    }

    componentDidMount(){
        this.getSelectList()
    }

    static getDerivedStateFromProps(nextProps, prevState){
        console.log(nextProps)
        console.log(prevState)
        let { value, name } = nextProps
        if (!value) {
            return false
        }
        console.log(Object.prototype.toString.call(value) === "[object Object]")
        if (Object.prototype.toString.call(value) === "[object Object]") {
            console.log(111)
            console.log(nextProps)
            value = value[name]
            // return false
        }
        console.log(value)
        // if (value !== prevState.value) {
        //     return {
        //         value: value
        //     }
        // }
        return null
    }
    

    getSelectList = () => {
        console.log(this.state.param)
        const url = this.props.url
        console.log(requestUrl[url])
        const data = {
            url: requestUrl[url],
            data: {}
        }
        requestData(data).then(response => {
            console.log(response)
            this.setState({
                options: response.data.data.data
            })
        })
    }

    onChange = (value) => {
        this.setState({
            value
        })
        this.triggerChange(value)
    }

    triggerChange = (changedValue) => {
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(changedValue)
            /** 提交的时候是对象，不是字符串 */
            // onChange({[this.state.name]: changedValue})
        }
    }
    render(){
        const { value, label } = this.state.props
        return(
             <Select style={this.option.style} placeholder={this.option.placeholder} >
                    {
                        this.state.options && this.state.options.map(ele => {
                        return <Option value={ele[value] } key={Number(ele[value])}>{ele[label]}</Option>
                        })
                    }
                </Select>
        )
    }
}

SelectComponent.propTypes = {
    formConfig: PropTypes.object
}

SelectComponent.defaultProps = {
    formConfig: {}
}

export default SelectComponent