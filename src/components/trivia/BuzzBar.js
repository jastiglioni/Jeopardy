import React, {useState, useEffect} from 'react'
import * as FireStoreService from '../../services/dbConfig'
import './Popup.css'

export default function BuzzBar(props) {
    const [barStatus, setBarStatus] = useState(false)



    const hook = () => {
        const unsubscribe = FireStoreService.readBuzzerStatus({
          next: dbSnapshot => {
            setBarStatus(dbSnapshot.data().status)
            // setBarStatus(dbSnapshot.doc("Buzzer").data().status)
          },
          error: () => console.log("there is an error with hook on popup")
        })
        return unsubscribe
      }

      useEffect(hook, [barStatus, setBarStatus])
    
    

    return (
      
             <div className={`buzzbar${barStatus}`}>{props.name}</div> 
       
    )
}
