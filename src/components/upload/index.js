import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Upload, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

class UploadComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            imageUrl: "",
            loading: false,
            name: props.name,
            uploadKey: {
              token: "",
              key: ""
            }
        }
        console.log(props)
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
          imageUrl: value
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

    // 组件卸载的时候删除uploadToken，可以放在外层组件，避免多个组件多次调用
    // 主要是uploadToken的时效性问题
    componentWillUnmount(){
      localStorage.removeItem("uploadToken")
    }

    getUploadToken = () => {
      // return UploadToken({
      //   ak:"sagdsfsdfsefsdfsdafewgsfad",
      //   sk:"sahergwefwefwefwe",
      //   buckety: "sadgsdfsfs"
      // }).then(res => {
      //   const data = res.data.data
      //   localStorage.setItem("uploadToken",data.token)
      //   return data.data
      // })
    }

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

      // 上传之前，处理格式大小等问题
    beforeUpload = async (file) => {

      const uploadToken = localStorage.getItem("uploadToken")

      // 多个upload使用同一个token，因为七牛云必须使用相同的token？
      // if (!this.props.request && !uploadToken) {
      //   return false
      // }

      const token = uploadToken || await this.getUploadToken()

        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        const name = file.name
        const key = encodeURI(`${name}`)
        this.setState({
          uploadKey:{
            token,
            key
          }
        })
        return isJpgOrPng && isLt2M;
      }
      
    
      handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          this.getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl,
              loading: false,
            }, () => {
                console.log(imageUrl)
                this.triggerChange(imageUrl)
            }),
          );
        }
      };

      // 返回图片数据
      triggerChange = (changedValue) => {
          const onChange = this.props.onChange
          if (onChange) {
              // onChange({[this.state.name]: changedValue})
              onChange(changedValue)
          }
      }

    render(){
        const { imageUrl, loading } = this.state
        const uploadButton = (
            <div>
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          );
        return(
             <Upload 
                name="avatar" 
                listType="picture-card" 
                className="avatar-uploader" 
                showUploadList={false} 
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76" 
                beforeUpload={this.beforeUpload} 
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: "100%"}}/> : uploadButton}
             </Upload>
        )
    }
}

// UploadComponent.propTypes = {
//     config: PropTypes.object,
//     request: PropTypes.bool
// }

// UploadComponent.defaultProps = {
//   request: false
// }

export default UploadComponent