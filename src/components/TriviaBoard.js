import React, {useState, useEffect} from 'react'
import Tile from './trivia/Tile'
import Popup from './trivia/Popup'
import '../styles/App.css';
import * as FireStoreService from '../services/dbConfig'

const TriviaBoard = () => {
  const [tiles, setTiles] = useState([])

const hook = () => {
    FireStoreService.colRefQuestion.onSnapshot(snap => {
      const val = snap.docs.map(doc => ({
        ...doc.data()
      }))
      setTiles(val)
    })
  }

  useEffect(hook, [])


  
  const col = {
    color: `white`,
    fontFamily: `Impact`,
    background: `#060CE9`,
    width: `300px`,
    height: `200px`,
    fontSize: `50px`,
    textAlign: `center`,
    textShadow: `4px 4px 0.075em black`,
    border: `none`
  }
 
  return (
    <div className="App">
      <button style={col}>CITIES & COUNTRIES</button>
      {tiles.map(obj => <Tile obj={obj} key={obj.text} />)}
      <p>in beta don't @ me</p>
      <p>send feature requests here ––> <span role="img" aria-label="trash">🗑️</span></p>
    </div>

    
  );
}

export default TriviaBoard;