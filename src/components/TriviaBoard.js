import React, {useState, useEffect} from 'react'
import Tile from './trivia/Tile'
import '../styles/App.css';
import * as FireStoreService from '../services/dbConfig'

const TriviaBoard = () => {
  const [tiles, setTiles] = useState([])
  const [category, setCategory] = useState("")

const hook = () => {
    FireStoreService.colRefQuestion.onSnapshot(snap => {
      const val = snap.docs.map(doc => ({
        ...doc.data()
      }))
      setTiles(val)
    })

    FireStoreService.colRefTrivia.doc("Panel").onSnapshot(snap => {
      setCategory(snap.data().category)
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
  }
 
  return (
    <div className="App">
      <button style={col}>{category.toUpperCase()}</button>
      {tiles.map(obj => <Tile obj={obj} key={obj.text} />)}
    </div>
  );
}

export default TriviaBoard;