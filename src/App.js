import React from 'react'
import Buzzer from './components/Buzzer'
import TriviaBoard from './components/TriviaBoard'
// import Home from './components/Home'
import Admin from './components/Admin'

import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom';

  const App = () => {


    return (
    <div >
      <Router>
        <Switch>
          {/* <Route exact path="/" render={() => (<Home />)} /> */}
          <Route exact path="/" component={Buzzer} />
          <Route path="/trivia" render={() => (
                <TriviaBoard  />
              )} />
          <Route path="/admin" component={Admin} />
        </Switch>

      </Router>
    
    </div>
  )
}

export default App;
