import { Components } from 'antd/lib/date-picker/generatePicker';
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { getToken } from '../../utils/cookies'

const PrivateRouter = ({ component: Component, ...rest }) => {
    console.log('before private router'+getToken())
    return (
        <Route {...rest} render={routeProps => (
            getToken() ? <Component {...routeProps} /> : <Redirect to="/login" />
            )} />
    )
}

export default PrivateRouter