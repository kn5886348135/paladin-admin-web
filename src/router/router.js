import React from 'react'
import { Router } from 'react-router'
import routes from '../routes/Root/index.js'
import { history } from '../store/routing'

const Root = (props)=>{
    return(
        <Router history={history} routes={routes} />
    )
}

export default Root