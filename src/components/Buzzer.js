import '../styles/Button.css'
import React, {useState, useEffect} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import * as FireStoreService from '../services/dbConfig'
import bee from './bee.png'
import './trivia/Korinna-Regular.otf'

const SignIn = (props) => {
 
  
  const signIn = (e) => {
    e.preventDefault()
    FireStoreService.signInAnon()
  }

  return (
    <>
      <form onSubmit={signIn}>
        <input placeholder="enter your name here" onChange={props.func}></input>
        <br/>
        <br/>
        <br/>
        <button className="false" type="submit" >Activate Buzzer</button>
      </form>
    </>
  )
}

function SignOut() {

    const signOut = (e) => {
      e.preventDefault()
      FireStoreService.signOut()
    }
  return (
    <button className="false" onClick={signOut}>Sign Out</button>
  )
}

const Button = (props) => {
  const [click, setClick] = useState('Blue')
  const [name] = useState(props.name)


const hook = () => {
  const unsubscribe = FireStoreService.readBuzzerStatus({
    next: dbSnapshot => {
      if (dbSnapshot.data().name === name) {
        setClick('Green')
      } else if (dbSnapshot.data().name === "Buzzer Active") {
        setClick('Blue')
      } else {
        setClick('Red')
      }
    },
    error: () => console.log("there is an error with hook")
  })
  return unsubscribe
}

  useEffect(hook, [name, setClick])

  const [barStatus, setBarStatus] = useState(false)



    const hook2 = () => {
        const unsubscribe = FireStoreService.readBuzzerStatus({
          next: dbSnapshot => {
            setBarStatus(dbSnapshot.data().barStatus)
          },
          error: () => console.log("there is an error with hook on popup")
        })
        return unsubscribe
      }

      useEffect(hook2, [barStatus, setBarStatus])


  const changeColor = async (e) => {
    e.preventDefault();
if (!barStatus) {

} else {
    FireStoreService.getBuzzUser().then(doc => {
      
      if (doc.exists) {
        const data = doc.data()
        if (!data.buzzerStatus || (data.name === name)) {
          console.log(`${props.name} buzzed in >:^(`)
          FireStoreService.setBuzzUser(name)
          setClick('Green')
        } else if (data.name === 'Buzzer Active'){
          setClick('Blue')
        } else {
          setClick('Red')
        }
      } 
      
      else {
        console.log("The BuzzUser document doesn't exist")
      }
    
      }).catch(error => {
        console.log("Error getting document: ", error)
      }) 

    }  }

 
  
 
  
 return (
    <>
      <h1 style={{fontFamily: 'Korinna'}}>Hello {name}</h1>
      <button className={barStatus ? `button${click}` : `buttonGrey`} onClick={changeColor}><img src={bee} alt="bee" width="150" height="150" /></button>
      <br/>
      
     
    </>
  )}

 function Buzzer() { 
  
  const [user] = useAuthState(FireStoreService.auth)
  const [name, setName] = useState('')

 

  const setUser = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }

  return (
    <div className="App">
    <header>
    
      <h3 style={{fontFamily: 'Korinna'}}>Welcome to Trivia Buzzer</h3>
      
    </header>

    <div>
      {user ? <Button name={name}/> : <SignIn func={setUser}/>}
    </div>
    <br/>
    <br/>
    { user ? <SignOut /> : "" }
  </div>
  )
}

export default Buzzer;
