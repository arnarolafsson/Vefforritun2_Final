import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import { Dashboard } from './components/Dashboard';
import Game from './components/Game';
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Welcome}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/match/:matchID" component={Game}/>
      </Switch>
    </div>
  );
}



export default App;
