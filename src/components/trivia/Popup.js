import React, {useState, useEffect} from 'react'
import './Popup.css'
import Play from './Play'
import Answer from './Answer'
import * as FireStoreService from '../../services/dbConfig'
import BuzzBar from './BuzzBar'



const Popup = (props) => {

const [name, setName] = useState('Buzzer Active')
const [ansFlag, setAnsFlag] = useState(false)


const hook = () => {
    const unsubscribe = FireStoreService.getPanelSnapshot({
      next: dbSnapshot => {
        setName(dbSnapshot.data().name)
        setAnsFlag(dbSnapshot.data().answerCard)
      },
      error: () => console.log("there is an error with hook on popup")
    })
    return unsubscribe
  }

   useEffect(hook, [setName, setAnsFlag])


    return (
        <div className='popup'>


          
            <BuzzBar name={name} />

            <div className='popup-inner'>
                <div className='close-btn'>
                </div>
                    <p className='text'>{props.text}</p>
                    
                    
                    <Answer flag={ansFlag} answer={props.answer} />
                    <Play audio={props.audio}/>
            </div>
        </div>
    )
}

export default Popup