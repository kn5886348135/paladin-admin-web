import React from 'react';
import { HashRouter, Switch, Route, Router, BrowserRouter, HashHistory,Link } from 'react-router-dom'
import PrivateRouter from '../privateRouter/index'
import User from '../../views/user/index'
import AddUser from '../../views/user/add'

class ContainerMain extends React.Component{
  constructor(){
    super()
    this.state  ={}
  }
  
  render(h) {
    return (
        <Switch>
            <PrivateRouter exact component={User} path="/index/user/list" />
            <PrivateRouter exact component={AddUser} path="/index/user/add" />
        </Switch>
    )
}
}

export default ContainerMain;
