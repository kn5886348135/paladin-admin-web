import React from 'react';
import { HashRouter, Switch, Route, Router, BrowserRouter, HashHistory,Link } from 'react-router-dom'
import logo from './logo.svg';
import Home from './views/Home'
import Login from './views/login/index'
class App extends React.Component{
  constructor(){
    super()
    this.state  ={}
  }
render(h) {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact component={Home} exact path="/" />
        <Route component={Login} exact path="/login" />
      </Switch>
    </BrowserRouter>
  )
}
}

export default App;
