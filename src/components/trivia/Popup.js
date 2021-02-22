import React, {useState, useEffect} from 'react'
import './Popup.css'
import Play from './Play'
import Answer from './Answer'
import * as FireStoreService from '../../services/dbConfig'



const Popup = (props) => {

const [name, setName] = useState('')
const [barStatus, setBarStatus] = useState(true)


const hook = () => {
    const unsubscribe = FireStoreService.getButtonStatus({
      next: dbSnapshot => {
        setName(dbSnapshot.data().name)
        // setBarStatus(dbSnapshot.doc("Buzzer").data().status)
      },
      error: () => console.log("there is an error with hook on popup")
    })
    return unsubscribe
  }

// const hook = () => {
//     const unsubscribe = FireStoreService.getDB({
//       next: dbSnapshot => {
//         setName(dbSnapshot.doc("Buzzer").data().name)
//         setBarStatus(dbSnapshot.doc("Bar").data().status)
//       },
//       error: () => console.log("there is an error with hook on popup")
//     })
//     return unsubscribe
//   }

//   const hook2 = () => {
//       const unsubscribe = FireStoreService.getButtonStatus({
//           next: dbSnapshot => {
//             setBarStatus(dbSnapshot.data().status)
//           }
//       })
//       return unsubscribe
//   }
  
    useEffect(hook, [setName, setBarStatus])
    //useEffect(hook2, [setBarStatus])

  console.log("bar status is ", barStatus);
    
    const [ansFlag, setAnsFlag] = useState(false)
    const toggleAnswer = () => {
        setAnsFlag(!ansFlag)
        console.log(ansFlag);
    }

    const popupToggle = (f) => {
        setAnsFlag(false)
        return f()
    }




    return (props.trigger) ? (
        <div className='popup'>


            <div className={`buzzbar${barStatus}`}>{name}</div>
            

            <div className='popup-inner'>
                <div className='close-btn'>
                <button onClick={toggleAnswer}>Answer</button>
                <button onClick={() => popupToggle(props.func)} >X</button>
                </div>
                    <p className='text'>{props.text}</p>
                    
                    
                    <Answer flag={ansFlag} answer={props.answer} />
                    <Play audio={props.audio}/>
            </div>
        </div>
    ) :''
}

export default Popup