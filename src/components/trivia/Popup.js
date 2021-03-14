import React, {useState, useEffect} from 'react'
import './Popup.css'
import Play from './Play'
import Answer from './Answer'
import * as FireStoreService from '../../services/dbConfig'
import BuzzBar from './BuzzBar'



const Popup = (props) => {

const [name, setName] = useState('Buzzer Active')



const hook = () => {
    const unsubscribe = FireStoreService.getButtonStatus({
      next: dbSnapshot => {
        setName(dbSnapshot.data().name)
      },
      error: () => console.log("there is an error with hook on popup")
    })
    return unsubscribe
  }

   useEffect(hook, [setName])





   const [ansFlag, setAnsFlag] = useState(false)
  

   const hook2 = () => {
    const unsubscribe = FireStoreService.getAnswerCard({
      next: dbSnapshot => {
        setAnsFlag(dbSnapshot.data().answerCard)
        // setBarStatus(dbSnapshot.doc("Buzzer").data().status)
      },
      error: () => console.log("there is an error with hook on popup")
    })
    return unsubscribe
  }

  useEffect(hook2, [setAnsFlag])


    return (
        <div className='popup'>


          
            <BuzzBar name={name} />

            <div className='popup-inner'>
                <div className='close-btn'>
                {/* <button onClick={toggleAnswer}>Answer</button> */}
                {/* <button onClick={() => popupToggle(props.func)} >X</button> */}
                </div>
                    <p className='text'>{props.text}</p>
                    
                    
                    <Answer flag={ansFlag} answer={props.answer} />
                    <Play audio={props.audio}/>
            </div>
        </div>
    )
}

export default Popup