import React, {useState, useEffect} from 'react'
import './Popup.css'
import Play from './Play'
import Answer from './Answer'
import db from '../dbConfig'
//const firestore = db.firestore()
const firestore = db.firestore()


const Popup = (props) => {

    const docRef = firestore.collection("trivia").doc("Buzzer");
    const docRefBuzzBar = firestore.collection("trivia").doc("Bar");
    //const docRef = db.firestore().collection("cities").doc("SF");
    
    
    
    var buzzerName = "jhaha"
    var buzzerStatus = true
    
    
    



const setName = async () => {
    await docRef.get().then(doc => {
        if (doc.exists) {
            return doc.data().name
        } else {
            console.log("doc doesnt exist");
        }
    })
}
  
    
    const [ansFlag, setAnsFlag] = useState(false)
    const toggleAnswer = () => {
        setAnsFlag(!ansFlag)
        console.log(ansFlag);
    }

    const popupToggle = (f) => {
        setAnsFlag(false)
        return f()
    }


    // docRefBuzzBar.onSnapshot(doc => {
    //     if (doc.exist) {
    //     console.log("doc exists")
    //     buzzerStatus = doc.data().status
    //     }
    // })


//     const hook = () => { docRefBuzzBar.onSnapshot(doc => {
//         if (doc.exist)
//         console.log("doc exists");
//         setBuzzerStatus(doc.data().status)
//     })
// }

//     useEffect(hook, [])





    return (props.trigger) ? (
        <div className='popup'>


            <div className="buzzbar">{() => setName}</div>
            

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