
import React from 'react'
import { observer, inject } from 'mobx-react'

@observer
class Homepage extends React.Component{

    // Homepage(){

    // }

    componentDidMount(){
        console.log('homepage didmount')
    }

    componentWillUnmount(){
        this.dispoer()
    }
    
    render(){
        return (
            <div>
                <h1>首頁</h1>
            </div>
        )
    }
}

export default Homepage