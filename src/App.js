import React from 'react';
import { HashRouter, Switch, Route, Router, BrowserRouter, HashHistory,Link } from 'react-router-dom'
import logo from './logo.svg';
import Home from './views/Home'
import Login from './views/login/index'
import Index from './views/index/index'
class App extends React.Component{
  constructor(){
    super()
    this.state  ={}
  }
render(h) {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact component={Index} exact path="/" />
        <Route exact component={Login} exact path="/login" />
      </Switch>
    </BrowserRouter>
  )
}
}

export default App;
