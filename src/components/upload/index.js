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
            name: props.name
        }
        console.log(props)
    }

    componentDidMount(){
    }

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

      // 上传之前，处理格式大小等问题
    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
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
              onChange({[this.state.name]: changedValue})
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

UploadComponent.propTypes = {
    formConfig: PropTypes.object
}

UploadComponent.defaultProps = {
    formConfig: {}
}

export default UploadComponent