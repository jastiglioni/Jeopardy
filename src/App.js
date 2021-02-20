import Buzzer from './components/Buzzer'
import TriviaBoard from './components/TriviaBoard'
import {
  BrowserRouter as Router,
  Switch, Route,
} from 'react-router-dom';

const notes = [
  {
    text: `the largest shipping port in the world is located in this city`.toUpperCase(),
    value: '$ 200',
    selected: false,
    audio: false,
    answer: `Shanghai`
  },
  {
    text: `this city-state resides on the french riviera`.toUpperCase(),
    value: '$ 400',
    selected: false,
    audio: false,
    answer: `Monaco`
  },
  {
    text: `this city has the largest metropolitan economy in the world`.toUpperCase(),
    value: '$ 600',
    selected: false,
    audio: false,
    answer: `Tokyo`
  },
  {
    text: `khmer is the offical language of this country`.toUpperCase(),
    value: '$ 800',
    selected: false,
    audio: false,
    answer: `Cambodia`
  },
  {
    text: `the currency code "NOK" is used to demarcate the currency of this country`.toUpperCase(),
    value: '$ 1000',
    selected: false,
    audio: false,
    answer: `Norway`
  }
]
  const App = () => {
    return (
    <div>
      <Router>
        

        <Switch>
          <Route path="/buzzer" component={Buzzer} />
          <Route path="/trivia" render={() => (
                <TriviaBoard notes={notes} />
              )} />
        </Switch>

      </Router>
    
    </div>
  )
}

export default App;
