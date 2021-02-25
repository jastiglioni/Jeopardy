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
      FireStoreService.setAnswerCard(true)
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
        </div>
    )
}
