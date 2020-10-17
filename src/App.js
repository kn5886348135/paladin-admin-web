import React from 'react';
import { HashRouter, Switch, Route, Router, BrowserRouter, HashHistory,Link } from 'react-router-dom'
import logo from './logo.svg';
import './App.scss';
import Home from './views/Home'
import Login from './views/Login'
import About from './views/About'
class App extends React.Component{
  constructor(){
    super()
    this.state  ={}
  }
render(h) {
  return (
    <div className="test">
      <h1>sssss</h1>
      <ul>
        <li>sdgsdfewghew</li>
        <li>sdgsdfewghew</li>
        <li>sdgsdfewghew</li>
        <li>sdgsdfewghew</li>
        <li>sdgsdfewghew</li>
        <li>sdgsdfewghew</li>
      </ul>
    <BrowserRouter>
      <Switch>
        <Route exact component={Home} exact path="/" />
        <Route component={Login} exact path="/login" />
        <Route component={About} exact path="/about" />
      </Switch>
    </BrowserRouter>
    </div>
  )
}
}

export default App;
