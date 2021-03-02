import React, {useState} from 'react'
import '../styles/Button.css'
import * as FireStoreService from '../services/dbConfig'

export default function Admin() {

    const toggleBuzzerBar = async(e) => {
        e.preventDefault();
        FireStoreService.toggleBuzzBar()
      }

    const reset = async (e) => {
      e.preventDefault()
      FireStoreService.resetBuzzUser()
    }


    const showAnswer = async (e) => {
      e.preventDefault()
      FireStoreService.toggleAnswerCard()
    }

    const click = (val) => {
      FireStoreService.toggleQ(val)
      FireStoreService.setAnswerCard(false)
      FireStoreService.setBuzzBar(false)
      FireStoreService.resetBuzzUser()
    }

    const Button = (props) => {
      const [num, setNum] = useState(props.num)
      const [bool, setBool] = useState(false)
       const click2 = () => {
         setBool(!bool)
         click(props.num)
         setNum("X")
       }


      return (
        <>
          <br/>
            <button className={`${bool}`} onClick={click2} >{num}</button>
          <br/>
        </>
      )
    }



    return (
    <div>
      <button className="false" onClick={toggleBuzzerBar}>TOGGLE BUZZER</button>
      <br/>
      <br/>
      <br/>
      <br/>
      <button className="false" onClick={reset}>Reset Database & Buzzah!</button>
      <br/>
      <br/>
      <br/>
      <br/>
      <button className="false" onClick={showAnswer}> Show Answer </button>
      <br/>
      <br/>
      <br/>
      <Button num={1} />
      <Button num={2} />
      <Button num={3} />
      <Button num={4} />
      <Button num={5} />
      
    </div>

    )
}
