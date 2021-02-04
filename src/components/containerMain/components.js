// import { Components } from "antd/lib/date-picker/generatePicker"

const files = require.context('../../views', true, /\.js$/)
const components = []

files.keys().forEach(key => {
  if (key.includes('./index/')||key.includes('./login/')) {
    return false
  }

  console.log(key)
  const splitFileName = key.split('.')
  const jsonObj = {}
  const path = `/index${splitFileName[1].toLowerCase()}`
  const component = files(key).default
  jsonObj.path = path
  jsonObj.component = component
  components.push(jsonObj)

  console.log(files(key).default)
  
})

export default components