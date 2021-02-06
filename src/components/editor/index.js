import React, { Component, Fragment } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { upload } from '@/api/common'

class EditorComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            value: ""
        }
    }

    componentDidMount(){

    }

    static getDerivedStateFromProps(nextProps, prevState){
        console.log(nextProps)
        console.log(prevState)
        let { value } = nextProps
        if (!value) {
            return false
        }
        console.log(Object.prototype.toString.call(value) === "[object Object]")
        // 上传组件不是对象，不像Select组件需要判断对象
        // 父组件传值到子组件
        // if (Object.prototype.toString.call(value) === "[object Object]") {
        //     console.log(111)
        //     console.log(nextProps)
        //     value = value[name]
        //     // return false
        // }
  
        if (value !== prevState.value) {
          return {
            value: value
          }
      }
  
        console.log(value)
        // if (value !== prevState.value) {
        //     return {
        //         value: value
        //     }
        // }
        return null
    }

    /** 获取富文本内容 */
    handleEditorChange = (value) => {
        console.log(value)
        // this.triggerChange(value)
    }

    triggerChange = (changedValue) => {
        const onChange = this.props.onChange
        if (onChange) {
            onChange(changedValue)
            // onChange({[this.state.name]: changedValue})
        }
    }

    render(h) {
        const editorObj={
            height:"800",
            language:"zh_CN",
            plugins:"table lists link image preview code",
            toolbar:"formatselect | code | preview | bold italic strikethrough forcecolor backcolor | link image | alignleft aligncenter alignright alignjustify",
            relative_urls: false,
            file_picker_types:"image",
            images_upload_url:"http",
            image_advtab: true,
            image_uploadtab: true,
            images_upload_handler: (blobInfo, success, failure) => {
                var formData;
                var file = blobInfo.blob();
                formData = new FormData()
                formData.append('file', file, file.name)
                upload(formData).then(response => {
                    console.log(response.data.data)
                    const data = response.data.data.url
                    success(data)
                }).catch(error => {
                    console.log(error)
                })
            },
        }
        return (
            <Fragment>
                <Editor 
                    inline={false}
                    selector="editorStateRef"
                    apiKey="官网上申请在key值"
                    initialValue={this.state.value}
                    init={{...editorObj}}
                    onEditorChange={this.handleEditorChange}
                />
            </Fragment>
        )
    }
}

export default EditorComponent
