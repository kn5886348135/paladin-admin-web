import React from 'react';
import { HashRouter, Switch, Route, Router, BrowserRouter, HashHistory,Link } from 'react-router-dom'
import PrivateRouter from '../privateRouter/index'
// import User from '../../views/user/list'
// import AddUser from '../../views/user/add'
// import DepartmentList from '../../views/department/list'
// import DepartmentAdd from '../../views/department/add'
import Components from './components'

class ContainerMain extends React.Component{
  constructor(){
    super()
    this.state  ={}
  }
  
  render(h) {
    return (
        <Switch>
          {
            Components.map(item => {
              console.log(item)
              return <PrivateRouter exact key={item.path} component={item.component} path={item.path} />
            })
          }
            {/* <PrivateRouter exact component={User} path="/index/user/list" />
            <PrivateRouter exact component={AddUser} path="/index/user/add" />
            <PrivateRouter exact component={DepartmentList} path="/index/department/list" />
            <PrivateRouter exact component={DepartmentAdd} path="/index/department/add" /> */}
        </Switch>
    )
}
}

export default ContainerMain;
