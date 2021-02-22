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

    return (
        <div>
      <button onClick={toggleBuzzerBar}>TOGGLE BUZZER</button>
      <br/>
      <br/>
      <button onClick={reset}>Reset Database & Buzzah!</button>
        </div>
    )
}
