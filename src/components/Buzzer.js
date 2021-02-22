import '../styles/Button.css'
import React, {useState, useEffect} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link } from 'react-router-dom'
//import db from './dbConfig'
import * as FireStoreService from '../services/dbConfig'

//const auth = FireStoreService.auth



//console.log("Hey " + docRefBuzzBar.get());


const SignIn = (props) => {
 
  
  const signIn = (e) => {
    e.preventDefault()
    FireStoreService.signInAnon()
  }

  return (
    <>
      <form onSubmit={signIn}>
        <input placeholder="enter your name here" onChange={props.func}></input>
        <button type="submit" >Sign Into Trivia</button>
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
    <button className="sign-out" onClick={signOut}>Sign Out</button>
  )
}

const Button = (props) => {
  const [click, setClick] = useState('Blue')
  const [name, setName] = useState(props.name)


const hook = () => {
  const unsubscribe = FireStoreService.getButtonStatus({
    next: dbSnapshot => {
      if (dbSnapshot.data().name === name) {
        setClick('Green')
      } else if (dbSnapshot.data().name === 'Buzzer Active') {
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

  
  const changeColor = async (e) => {
    e.preventDefault();

    FireStoreService.getBuzzUser().then(doc => {
      
      if (doc.exists) {
        const data = doc.data()
        if (!data.buzzer || (data.name === name)) {
          console.log(`${props.name} buzzed in >:^(`)
          FireStoreService.setBuzzUser(name)
          setClick('Green')
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

  }

  const toggleBuzzerBar = async(e) => {
    e.preventDefault();
    //FireStoreService.toggleBuzzBar((await FireStoreService.getBuzzBarStatus()).data().status)
    FireStoreService.toggleBuzzBar()
    //console.log((await FireStoreService.getBuzzBarStatus()).data())
  }
  
  const reset = async (e) => {
    e.preventDefault()
    setClick('Blue')
    FireStoreService.resetBuzzUser()
  }
  
 return (
    <>
      <h2>Hello {name}</h2>
      <button className={`button${click}`} onClick={changeColor}>CLICK ME TO BUZZ IN</button>
      <br/>
      <button onClick={reset}>Reset Database & Buzzah!</button>
      <br/>
      <br/>
      <button onClick={toggleBuzzerBar}>TOGGLE BUZZER</button>
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
    <Link to="/">Home Page</Link>
      <h1>Welcome to Trivia Buzzer</h1>
      
    </header>

    <div>
      {user ? <Button name={name}/> : <SignIn func={setUser}/>}
    </div>
    <br/>
    <br/>
    <SignOut />
  </div>
  )
}

export default Buzzer;
