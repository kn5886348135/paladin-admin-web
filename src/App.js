import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Login from './views/login/index'
import Index from './views/index/index'
import PrivateRouter from './components/privateRouter/index'

class App extends React.Component{
  constructor(){
    super()
    this.state  ={}
  }
render(h) {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route exact component={Index} exact path="/" /> */}
        {/* <Route exact render={() => true ? 11 : <Index/> } path='/' /> */}
        <Route exact component={Login} path="/login" />
        <PrivateRouter component={Index} path="/" />
      </Switch>
    </BrowserRouter>
  )
}
}

export default App;
