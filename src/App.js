import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Room from './pages/Room'
import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path={'/'} component={Home}/>
          <Route path={'/room'} component={Room}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
