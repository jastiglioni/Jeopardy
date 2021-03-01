import React from 'react'
import * as FireStoreService from '../services/dbConfig'

export default function Admin() {

    const toggleBuzzerBar = async(e) => {
        e.preventDefault();
        //FireStoreService.toggleBuzzBar((await FireStoreService.getBuzzBarStatus()).data().status)
        FireStoreService.toggleBuzzBar()
        //console.log((await FireStoreService.getBuzzBarStatus()).data())
      }

    const reset = async (e) => {
      e.preventDefault()
      
      FireStoreService.resetBuzzUser()
    }


    const showAnswer = async (e) => {
      e.preventDefault()
      //FireStoreService.setAnswerCard(true)
      FireStoreService.toggleAnswerCard()
    }

    const click = (val) => {
      //e.preventDefault()
      FireStoreService.toggleQ(val)
      FireStoreService.setAnswerCard(false)
      FireStoreService.setBuzzBar(false)
      FireStoreService.resetBuzzUser()
    }



    return (
    <div>
      <button onClick={toggleBuzzerBar}>TOGGLE BUZZER</button>
      <br/>
      <br/>
      <br/>
      <br/>
      <button onClick={reset}>Reset Database & Buzzah!</button>
      <br/>
      <br/>
      <br/>
      <br/>
      <button onClick={showAnswer}> Show Answer </button>
      <br/>
      <br/>
      <br/>
      <button onClick={() => click(1)}>Tile One</button>
      <br/>
      <br/>
      <br/>
      <button onClick={() => click(2)}>Tile Two</button>
      <br/>
      <br/>
      <br/>
      <button onClick={() => click(3)}>Tile Three</button>
      <br/>
      <br/>
      <br/>
      <button onClick={() => click(4)}>Tile Four</button>
      <br/>
      <br/>
      <br/>
      <button onClick={() => click(5)}>Tile Five</button>
    </div>

    )
}
